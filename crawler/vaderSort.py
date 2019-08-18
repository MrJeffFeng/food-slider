from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def vaderSort(strings:list)->list:
    analyzer = SentimentIntensityAnalyzer()
    scores = dict()
    for s in strings:
        scores[s] = analyzer.polarity_scores(s)['compound']

    return sorted(strings,key=lambda x: -scores[x])

if __name__ == '__main__':
    #test
    print(vaderSort(["hi","good","bad"]))
