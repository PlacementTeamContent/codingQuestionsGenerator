import fs from "fs";
import { v4 } from "uuid";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const questions_response_path = "./responses_json/" + parent_json_file_name + "_responses.json";
const final_responses_path = "./final_responses/" + parent_json_file_name + "_final_responses.json";

const readFileAsync = async (file, options) =>
  await new Promise((resolve, reject) => {
    fs.readFile(file, options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }
);

async function getPromptResponses() {
    try {
      const questions_prompts = await readFileAsync(questions_response_path, "utf8");
      const questions_prompts_json = JSON.parse(questions_prompts);
      return questions_prompts_json;
    } catch (error) {
      console.error("Error reading question prompts:", error);
      throw error;
    }
}

const difficulty_level = {
  "0" : "EASY",
  "1" : "MEDIUM",
  "2" : "HARD"
}

const extractQuestionsData = (prompt_responses) => {

    let final_json_sheet = [];
    
    prompt_responses.forEach(prompt_response => {
        const startIndex = prompt_response["prompt_response"].indexOf("```json\n[") + 8;
        const endIndex = prompt_response["prompt_response"].lastIndexOf("]\n```");
        const prompt_response_json = JSON.parse(prompt_response["prompt_response"].slice(startIndex, endIndex+1));
        let resources = {
          "resource_name": prompt_response["resource_name"], 
          "resource_url": prompt_response["resource_url"]
        };
        const short_text = prompt_response["short_text"]; 
        const code_language = prompt_response["code_language"];

        prompt_response_json.forEach((response, index) => {
            let question_data = {};
            let defaultTagNames = ["POOL_1"];
            const sourceTag = "SOURCE_" + resources["resource_name"].toUpperCase();
            defaultTagNames.push(sourceTag); 

            question_data["problem_text"] = response["problem_text"];
            question_data["short_text"] = short_text;
            question_data["question_type"] = "CODING";
            question_data["question_key"] = index;
            question_data["skills"] = [];
            question_data["question_format"] = "CODING_PRACTICE";
            question_data["content_type"] = "MARKDOWN";
            question_data["difficulty"] = "EASY";
            question_data["remarks"] = "";
            question_data["scores_updated"] = true;
            question_data["scores_computed"] = 10;
            question_data["questions_asked_by_companies_info"] = [];
            question_data["solutions"] = [];
            question_data["hints"] = [];
            question_data["code_language"] = code_language
            question_data["code_data"] = response["code_data"];
            question_data["test_case_input"] = "";
            question_data["test_case_ouput"] = "";
            question_data["cpp_python_time_factor"] = 0;
            // question_data["question_id"] = v4();
            question_data["tag_names"] = 2;
            question_data["resource_name"] = resources["resource_name"];
            question_data["resource_url"] = resources["resource_url"];
            final_json_sheet.push(question_data);
            
            for (let i=0; i<2; i++) {
              let tag_names = {};
              tag_names["problem_text"] = "";
              tag_names["short_text"] = "";
              tag_names["question_type"] = "";
              tag_names["question_key"] = "";
              tag_names["skills"] = [];
              tag_names["question_format"] = "";
              tag_names["content_type"] = "";
              tag_names["difficulty"] = "";
              tag_names["remarks"] = "";
              tag_names["scores_updated"] = "";
              tag_names["scores_computed"] = "";
              tag_names["questions_asked_by_companies_info"] = [];
              tag_names["solutions"] = [];
              tag_names["hints"] = [];
              tag_names["code_language"] = ""
              tag_names["code_data"] = "";
              tag_names["test_case_input"] = "";
              tag_names["test_case_ouput"] = "";
              tag_names["cpp_python_time_factor"] = "";
              // tag_names["question_id"] = v4();
              tag_names["tag_names"] = defaultTagNames[i];
              tag_names["resource_name"] = "";
              tag_names["resource_url"] = "";
              final_json_sheet.push(tag_names);
            }

            for (let i=1; i<=10; i++) {
                let test_cases = {};
                let test_case = response["test_cases"]["test_case_"+i];
                test_cases["problem_text"] = "";
                test_cases["short_text"] = "";
                test_cases["question_type"] = "";
                test_cases["question_key"] = "";
                test_cases["skills"] = [];
                test_cases["question_format"] = "";
                test_cases["content_type"] = "";
                test_cases["difficulty"] = "";
                test_cases["remarks"] = "";
                test_cases["scores_updated"] = "";
                test_cases["scores_computed"] = "";
                test_cases["questions_asked_by_companies_info"] = [];
                test_cases["solutions"] = [];
                test_cases["hints"] = [];
                test_cases["code_language"] = ""
                test_cases["code_data"] = "";
                test_cases["test_case_input"] = test_case["Input"];
                test_cases["test_case_ouput"] = test_case["Output"];
                test_cases["cpp_python_time_factor"] = "";
                // test_cases["question_id"] = v4();
                test_cases["tag_names"] = "";
                test_cases["resource_name"] = "";
                test_cases["resource_url"] = "";
                final_json_sheet.push(test_cases);
            }
        });
    });
    console.log("\nWriting into file\n");
    const jsonData = JSON.stringify(final_json_sheet);
  fs.writeFile(final_responses_path, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('An error occurred while writing the file:', err);
      return;
    }
    console.log('JSON file has been created successfully!');
  });
}

async function start() {
    try {
        const prompt_responses = await getPromptResponses();
        extractQuestionsData(prompt_responses);
    } catch (error) {
      console.error("Error during processing:", error);
    }
}

start();
