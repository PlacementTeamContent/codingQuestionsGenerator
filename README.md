### Initialization
Installation of nodeJs software from [node](https://nodejs.org/en/download)  
Open this directory in terminal and run `npm install` or `npm i`.    
After the installation of dependencies, run `npm run setup`.  

### Pre-requisities
- After downloading your csv file from your spreadsheet, convert your csv into json file [csv_to_json](https://data.page/csv/json)  

### Steps
Step-1:- Now save your obtained json file in **parent_json** directory.  
Step-2:- Replace **parent_json_file_name** variable in .env file.  
Step-3:- Run the following command in terminal: ` node generate_prompts.js `.  
Step-4:- Run the following command in terminal: ` node generate_responses.js `.  
Step-5:- Run the following command in terminal: ` node generate_coding.js `.  
Step-6:- Run the following command in terminal: ` node generate_zip.js `.  
Step-7:- Run the following command in terminal: ` node generate_final.js `.  
Step-8:- Now You can find your intermediate output file in **responses_json** directory with suffix as "_responses.json" file.  
Step-9:- Now You can find your final output file in **final_responses_json** directory with suffix as "_final_responses.json" file.  

### Post-Works
- Now convert your json into csv file [json_to_csv](https://data.page/json/csv) for Step-8 & 9.  
- Store the csv file (mentioned in Step-8) into **Prompts & Responses (csv)** folder in g-drive.
- Store the csv file (mentioned in Step-9) into **Curation** folder as **SHEET_1** in g-drive.
