# finalproject-infovis
Final Project Readme
Class: INFO 4602-5602 “Information Visualization”
Instructor: Dr. Danielle Szafir
Final Project Title: A Summary of Vaccine Reported Events in 2017
Authored by: Gena Welk
(solo project - no collaborative team members)
Date: May 5, 2018

<b>What to grade:</b><br>
Indexv100.html - this is the main page, including graphics and formatting

DeathGraphD3.html - this is linked from the image of the Deaths Bar Graph in Indexv100.html (since I could not get it to work in the page) Please note the graph has interactive tool tips.

DeathBarGraph.js - this is the javascript file which provides the interactive graph shown in DeathGraphD3.html

InjuredGraphD3.html - this is linked from the image of the Injuries Bar Graph in Indexv100.html (since I could not get it to work in the page) Please note the graph has interactive tool tips.

InjuredBarGraph.js - this is the javascript file which provides the interactive graph shown in InjuredGraphD3.html

Referenced data files include 2 csv’s:
VaxDeaths2017v02.csv
VaxInj2017.csv


<b>Trouble Acquiring data:<b><br>
My original goal with this project was to suggest a possible relationship between our increasing vaccination rates/requirements and the increase in health issues among our youth.  My intent was to acquire two types of data
data documenting the change in the US immunization schedule (showing how many more vaccines our kiddos get today than 30,40, or 50 years ago, as well as the early ages they are required to receive them).  
data showing the increased prevalence of autism, mental illness, asthma, and allergies over the last few decades. 
While I understand that showing this data would not prove that correlation is causation, the goal was to represent that this link may be something worthy of investigation.

I attempted to find data from these sources
Center for Disease Control
Autism and Developmental Disabilities Monitoring (ADDM) Network 
American Academy of Allergy, Asthma & Immunology (AAAAI) http://www.aaaai.org/about-aaaai/newsroom/allergy-statistics
Autism Speaks

Data was challenging to locate, obfuscated in its presentation, and sometimes absent altogether.  Perhaps this is due to the controversial nature of the data.
In looking at Autism Spectrum Disorders, the CDC’s subset organizations are only collecting information from a small number of counties in 11 states.  In addition the information was spotty and inconsistent, meaning there hasn’t been a long enough history of trust-able info with similar characteristics for comparison. (As an added bonus, the 2018 report was just published on April 26 - unavailable when I began this project - but dispersed as I am now finishing up and doing my write-up!)

In many other places I found that data had already been gathered and interpreted, and therefore only summary information was available (http://www.aaaai.org/about-aaaai/newsroom/allergy-statistics).  Without access to the raw data itself, I could not be sure the interpretations were accurate.  More importantly, I did not have the freedom to re-aggregate the data to explore for trends and compare across different datasets.

Success: Data acquired!
The data that I was able to find was from the Vaccine Adverse Events Reporting System (VAERS). These were hard numbers that I felt I could trust.

However, the VAERS data came with a big disclaimer.  They wanted to ensure that users of the data DO NOT interpret the results as claiming that vaccines CAUSE adverse reactions (although that’s essentially why they are collecting the data - to spot trends in case the data shows a relationship).  So I did what I thought was right - interpret the data as possibly showing a direct link between adverse events and the vaccine.  In addition, I included the disclaimer so as not to misrepresent facts.

Cleaning the data:
I joined the data (based on the key VAERS_ID) from “2017VAERS_Data.csv” and “2017VAERSVAX.csv” so I could see which deaths were from which vaccines.

I simplified the naming schemes.  For example, the database consisted of 79 unique vaccination types.  After regrouping (for example, combining “PPV” “PNC” “PNC10” and “PNC13” into a new vaccination type caled “Pneumococcal”) there were 39 vaccination types.  The reason for this was twofold: 
to make it more readable - Pneumococcal is more meaningful to the average reader than “PNC10”
to have the data make more sense - (leaving the data in its separate groups would create for a high number of “bins” and make less sense to the viewer.  For example, FLU3 and FLU4 are both influenza vaccines and therefore it makes sense to combine them - as the purpose of this vis is simplified understanding for the common viewer.)

I went through the data and separated out the deaths so I could isolate the death VAERS_ID’s resulting in deaths,  and then categorized the data so I could see which vaccines were responsible for those deaths.

Mistake: I tried to clean the data in Alteryx, but I ended up with incorrect information (user error). I went back to my default cleaning method in Excel (where I have more confidence in processing and more integrity in the outcome)

Challenge: I found that there were multiple records for side effects, and I had to make sure not to double count the info.

Visualizing

I initially wanted to use D3.js to create visualizations for this project.  By using D3 it would make the graphs scalable and reusable - in the sense that if/when the data changes the graphs could be dynamically populated (as long as the fields remained the same).

As a protoype, I created bar graphs in Tableau.  My goal was to be simple, clear, and meaningful.  I tried to achieve this by clearly labeling the axes, the title of the graph, and the qty that the height each bar graph represented.  Even though I felt these were self-explanatory, I added commentary to further narrate the story as a whole.

I made lots of attempts with d3 accompanied by much frustration.  I looked to classmates and instructors for support, but the timing didn’t seem to work out.  In addition, I used 
Scott Murray’s book Interactive Data Visualization for the Web: An Introduction to Designing with D3
web tutorials from “Mike Bostock's Blocks” - bl.ocks.org
JavaScript For Kids For Dummies by Chris Minnick and Eva Holland, https://d3js.org/, https://swizec.com/blog/3-key-insights-make-d3-js-easy-learn/swizec/8179.
Adding tooltips: http://bl.ocks.org/Caged/6476579 from Justin Palmer’s Block 6476579 ← 3885304
Wrapping long labels: https://bl.ocks.org/mbostock/7555321 from Mike Bostock’s Block 7555321

Presenting the Visualization
I was unsuccessful in integrating my D3 visualizations with my primary webpage (indexv100.html).

Instead, I presented the Tableau graphs as image files in my html document.  In addition to the graphs themselves, I presented the viewer with commentary on the meaning and purpose behind the graphs, the disclaimers, and places to go for more information (on both sides of this controversial issue)

While the D3.js graphs are not directly found in indexv100.html, they are not far away.  I linked the Tableau graphs (found in indexv100.html) to the d3 creations (as a last resort to show some sort of partial success).  Please note these d3 creations have tool-tip interactivity.

Afterthought: Limitations of the Data
VAERS reports all “Adverse Events” that get reported to them.  In their list of events, it included major events such as human deaths along with minor events such as swelling at the injection site.  It even included “Expired Product Administered” when there was no side effect at all.  If I were to do this over again, I would think critically about the categorization of injuries so as not to confuse critical injuries with minor injuries.  (In fact, I’m surprised the CDC would commingle this data, as it might unnecessarily or inaccurately inflate the numbers.)

Learning outcomes
Worked with d3, even though unsuccessful in placing in final html page
Stronger in Javascript
Stronger in html
“Tied it all together” - presented a wholistic view instead of parts
Narrative storytelling
Considered the user experience - simplified understanding through graphs

Future Work
If I was to continue on this project, I would collect data from more years and attempt to add interactivity so the viewer could compare trends over time dynamically.

References:

