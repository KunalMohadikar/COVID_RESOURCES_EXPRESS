import pandas as pd
from twitter import Twitter
from twitter import OAuth
import re

import json
from pandas.io.json import json_normalize

ck = 'QvGBrXMEZhicazT2XzvK1usgY' #consumer key
cs = 'TyYiFfvYszrjtoikhn5dlMYWljuEPGQu3iUlPZmByZAgKwTgP2' #consumer key secret
at = '954075809018470400-2TRhibAbIA7OBhPUXuf6xE8NIMTWa17'
ats = 'qbg2ibQ4QILAIYidy9kdANZ5cxSO2a9jCPhOIYmsGm1Wv'

oauth = OAuth(at,ats,ck,cs)

api = Twitter(auth=oauth)

df = pd.DataFrame()
mid = 0
for i in range(10):
    if i == 0:
        search_tw = api.search.tweets(q="from:sreekanth324", count=100, tweet_mode='extended')
    else:
        search_tw = api.search.tweets(q="from:sreekanth324", count=100, max_id=mid, tweet_mode='extended')

    dftemp = json_normalize(search_tw, 'statuses')
    #     mid = dftemp1['id'].min()
    #     mid=mid-1
    for j in range(0, len(dftemp.index)):
        if dftemp['id'][j] != None:
            if mid == 0:
                mid = dftemp['id'][j]
            if mid > dftemp['id'][j]:
                mid = dftemp['id'][j]

    mid = mid - 1;
    df = df.append(dftemp, ignore_index=True)


# print(df['full_text'][0])

df.sort_values(by=['created_at'],ascending=False)

df_filtered = df[df['full_text'].str.contains('Oxygen|oxygen')]


# Mobile no.
def extractMob(text):
    pattern = re.compile("\d{10,12}")
    x = pattern.findall(text)
    return x


def extractMobDF(df):
    mobs = {}
    for i in df.index:
        mob = extractMob(df['full_text'][i])
        mobs[i] = mob

    return mobs

df_oxygen = df_filtered[['created_at','full_text']]
df_mobs = extractMobDF(df_oxygen)
df_oxygen["phoneNo"] = pd.Series(df_mobs)
df_oxygen.to_csv("/home/kunal/Desktop/CovidProject/df_oxygen.csv", index=False)

for i in df_oxygen.index:
    temp = {
        'index': i,
        'full_text': df_oxygen['full_text'][i],
        'phoneNo': df_oxygen['phoneNo'][i]
    }
    print(temp)