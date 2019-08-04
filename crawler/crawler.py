from lxml import html,etree
import re
from time import time
from collections import defaultdict
from urlparse import urlparse, parse_qs, urljoin
from simple_get import simple_get


class Crawler():

    #keeps track of subdomain visited
    #subdomain:set of url processed from such subdomain
    overalldict = defaultdict(set)

    def __init__(self, toCrawl = []):

        self.toCrawl = toCrawl

    def update(self):
        unprocessed_links = self.to_crawl()
        if unprocessed_links:
            self.download_links(unprocessed_links)

    def download_links(self, unprocessed_links):
        for link in unprocessed_links:
            print("Got a link to download:", link.full_url)
            downloaded = simple_get(link)
            file = open('data/'+link.full_url, 'w')
            file.write(str(downloaded))
            file.close()
            links = extract_next_links(downloaded)

            #finds subdomains visited
            self.overalldict[urlparse(downloaded.url).netloc].add(downloaded.url)
            file = open("subdomains_visited.txt",'w')

            try:
                file.write("Subdomain ::: Number of unique urls processed from this subdomain\n")
                for url in self.overalldict:
                    file.write(url+" ::: " + str(len(self.overalldict[url]))+"\n")
            except Exception as e:
                print e
            finally:
                file.close()


            for l in links:
                if is_valid(l):
                    self.toCrawl.add(l)

    def extract_next_links(rawDataObj):
        outputLinks = []
        try:
            if rawDataObj.content:
                root = etree.HTML(rawDataObj.content)
                alllinks = root.findall(".//a[@href]")

                for link in alllinks:
                    outputLinks.append(urljoin(rawDataObj.url,link.get('href')))
        except:
            pass

        return outputLinks

    def is_valid(url):
        '''
        Function returns True or False based on whether the url has to be
        downloaded or not.
        Filter out crawler traps.
        '''
        parsed = urlparse(url)

        if parsed.scheme not in set(["http", "https"]):
            return False

        #Urls filled with a large number of characters can crash the parser.
        #Long urls can also indicate repeating directories or dynamic pages with long queries.
        #The number 100 was set fairly arbitraily as we observed that on the ics websites
        #most valid pages are below 100 in character count.
        if len(url)>100:
            return False


        #if netloc is empty, then url is not an absolute path.
        #so we return false when netloc is empty since url isn't absolute
        if not bool(urlparse(url).netloc):
            return False



        try:
            directories = [x for x in url.split("//")[1].split("/") if x.isalnum()]

            #repeating directories often indicate a crawler trap
            #we chose 5 as a fairly arbitrary number; by obervation we saw no valid url with 5 repeating directories.
            if len(directories) - len(set(directories)) > 5:
                return False

            #infinitely deep directories can trap web crawlers
            #we chose 15 as a fairly arbitrary number; by obervation we saw no valid url deeper than 15 levels of directories.
            if len(directories) > 15:
                return False
        except Exception as e:
            print e


        #with a question mark and query parameters, the url is likely a dynamic calendar trap
        if (("?" in url) and (  ("month=" in url.lower() and "day=" in url.lower() and "year=" in url.lower()) or  re.search("\d\d\d\d[-\/]\d\d[-\/]\d\d",url) or re.search("\d\d[-\/]\d\d[-\/]\d\d\d\d",url)   )):
            return False


        try:
            return not re.match(".*\.(css|js|bmp|gif|jpe?g|ico" + "|png|tiff?|mid|mp2|mp3|mp4"\
                + "|wav|avi|mov|mpeg|ram|m4v|mkv|ogg|ogv|pdf" \
                + "|ps|eps|tex|ppt|pptx|doc|docx|xls|xlsx|names|data|dat|exe|bz2|tar|msi|bin|7z|psd|dmg|iso|epub|dll|cnf|tgz|sha1" \
                + "|thmx|mso|arff|rtf|jar|csv"\
                + "|rm|smil|wmv|swf|wma|zip|rar|gz|pdf)$", parsed.path.lower())

        except TypeError:
            print ("TypeError for ", parsed)
            return False


if __name__ == '__main__':
    main_crawler = Crawler(['https://www.yelp.com/'])

    while(len(main_crawler.toCrawl)):
        main_crawler.update()
