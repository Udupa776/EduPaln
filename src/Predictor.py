import pandas as pd
import sys 
import json

colleges = {
"001": "University of Visvesvaraya College of Engineering",
"002": "Govt. S K S J T Institute of Engineering, Bangalore",
"003": "B M S College of Engineering, Basavanagudi, Bangalore",
"004": "Dr. Ambedkar Institute of Technology, Bangalore",
"005": "R. V. College of Engineering, Bangalore",
"006": "M S Ramaiah Institute of Technology, Bangalore",
"007": "Dayananda Sagar College of Engineering, Bangalore",
"008": "Bangalore Institute of Technology, K.R.Road, Bangalore",
"009": "PES University",
"011": "M V J College of Engineering, Bangalore",
"012": "Sir M. Visvesvaraya Institute of Technology, Bangalore",
"013": "Ghousia Engineering College, Ramanagara",
"014": "S J C Institute of Technology, Chickkaballapur",
"015": "Dr.T.Thimmaiah Institute of Technology, KGF",
"016": "Siddaganga Institute of Technology, Tumkur",
"017": "Sri Siddhartha Institute of Technology, Tumkur",
"018": "Kalpatharu Institute of Technology, Tiptur",
"021": "Sri Jayachamarajendra College of Engineering (JSS STU), Mysore",
"022": "The National Institute of Engineering (South Campus), Mysore",
"023": "P E S College of Engineering, Mandya",
"024": "Malnad College of Engineering, Hassan",
"028": "Tontadarya College of Engineering, Gadag",
"029": "Maratha Mandal Engineering College, Belgaum",
"031": "B V V Sangha’s Basaveshwara Engineering College, Bagalkote",
"032": "R.T.E. Society's Rural Engineering College, Hulkoti",
"033": "Sri Taralabalu Jagadguru Institute of Technology, Ranebennur",
"034": "SDM College of Engineering, Dharwad",
"035": "Anjuman Institute of Technology & Management, Bhatkal",
"036": "K L E Technological University, Belgaum (Formerly KLE Dr. M.S. Sheshagiri College)",
"037": "K.L.S. Gogte Institute of Technology, Belgaum",
"038": "BLDEA's VP. Dr. P.G. Hallakatti College of Engineering & Technology, Bijapur",
"040": "Hira Sugar Institute of Technology, Nidasoshi",
"041": "P D A College of Engineering, Gulbarga",
"042": "Khaja Bandanawaz University, Kalaburagi",
"043": "Gurunanak Dev Engineering College, Bidar",
"044": "Bheemanna Khandre Institute of Technology, Bhalki",
"045": "Rao Bahadur Y. Mahabaleswarappa Engineering College, Bellary",
"046": "H K E's Sir M Visvesvaraya College of Engineering, Raichur",
"047": "Malnad College of Engineering, Hassan",
"048": "B M S College of Engineering, Basavanagudi, Bangalore",
"049": "B V V Sangha’s Basaveshwara Engineering College, Bagalkote",
"054": "K V G College of Engineering, Sullia",
"055": "P A College of Engineering, Mangalore",
"056": "The National Institute of Engineering (South Campus), Mysore",
"057": "JSS Science and Technology University, Mysuru",
"058": "P E S College of Engineering, Mandya",
"059": "P D A College of Engineering, Gulbarga",
"060": "Dr. Ambedkar Institute of Technology, Bangalore",
"061": "University B.D.T College of Engineering, Davanagere",
"062": "Bapuji Institute of Engineering & Technology, Davangere",
"063": "S J M Institute of Technology, Chitradurga",
"064": "Adichunchanagiri Institute of Technology, Chickamagalur",
"065": "Jawaharlal Nehru New College of Engineering, Shimoga",
"066": "University B.D.T. College of Engineering (H.Gov), Davanagere",
"070": "Bahubali College of Engineering, Shravanabelagola, Hassan",
"071": "Vidya Vardhaka College of Engineering, Mysore",
"075": "Ballari Institute of Technology & Management, Bellary",
"076": "Proudadevaraya Institute of Technology, Hospet",
"077": "Vidya Vikas Institute of Engineering & Technology, Mysore",
"078": "The Oxford College of Engineering, Bangalore",
"079": "Acharya Institute of Technology, Bangalore",
"081": "Sri Siddhartha School of Engineering, Tumkur",
"082": "J S S Academy of Technical Education, Bangalore",
"083": "H.K.B.K. College of Engineering, Bangalore",
"085": "APS College of Engineering, Bangalore",
"086": "Sri Sairam College Of Engineering, Anekal, Bangalore",
"087": "Vivekananda Institute of Technology, Kengeri, Bangalore",
"090": "Sri Revana Siddeswara Institute of Technology, Bangalore",
"091": "K S Institute of Technology, Bangalore",
"092": "Vemana Institute of Technology, Bangalore",
"093": "Basavakalyana Engineering College, Basavakalyana, Bidar",
"094": "Coorg Institute of Technology, Ponnampet",
"095": "AMC Engineering College, Bangalore",
"096": "East Point College of Engineering & Technology, Bangalore",
"097": "C M R Institute of Technology, Bangalore",
"098": "Atria Institute of Technology, Bangalore",
"099": "New Horizon College of Engineering, Bangalore",
"100": "K N S Institute of Technology, Bangalore",
"101": "Channabasaveshwara Institute of Technology, Gubbi",
"102": "Don Bosco Institute of Technology, Bangalore",
"103": "Global Academy of Technology, Bangalore",
"104": "Nagarjuna College of Engineering & Technology, Devanahalli",
"106": "East West Institute Of Technology, Bangalore",
"107": "B N M Institute of Technology, Bangalore",
"108": "Sapthagiri NPS University, Bangalore",
"109": "City Engineering College, Bangalore",
"111": "Sri Venkateshwara College of Engineering, Bangalore",
"112": "Sri Krishna Institute of Technology, Bangalore",
"113": "Sambhram Institute of Technology, Bangalore",
"114": "G M Institute of Technology, Davanagere",
"115": "S.J.B. Institute of Technology, Bangalore",
"116": "R.L. Jalappa Institute of Technology, Doddaballapura",
"118": "RNS Institute of Technology, Bangalore",
"119": "K C T Engineering College, Gulbarga",
"120": "Jnanavikasa Institute of Technology, Bidadi, Ramanagar",
"121": "Vivekananda College of Engineering & Technology, Puttur",
"123": "Canara Engineering College, Bantwal",
"124": "Rajiv Gandhi Institute of Technology, Bangalore",
"126": "B M S Institute of Technology & Management, Yelahanka, Bangalore",
"127": "M S Engineering College, Bangalore",
}

df=pd.read_excel("src/cetcutofff.xlsx")
select=sys.argv[1]
rank=int(sys.argv[2])
df["GM"]=pd.to_numeric(df["GM"])
df["Courses"] = df["Courses"].str.replace("_x000D_", " ", regex=False)
if(select=="all"):
    res=df[df["GM"]>rank]
    
else:
    df=df[df["Courses"].str.contains(select,case=False)]
    res=df[df["GM"]>rank]

res=df[df["GM"]>rank]
result = res.sort_values(by="GM")
final=[]
m=[]
c=0
if not result.empty:
    for i in range(min(len(result),5)):
        final.append(result.iloc[i]["Courses"])
    
    for i in final:
        if colleges[i[:3]] not in m:
            m.append(colleges[i[:3]])
    for k in m:
        print(k)
else:
    print("not found")
  