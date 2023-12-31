import fs from "fs";
import { v4 } from "uuid";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const responses_testcase_json_path = "./responses_testcase_json/" + parent_json_file_name + "_r_testcase.json";
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
      const questions_prompts = await readFileAsync(responses_testcase_json_path, "utf8");
      const questions_prompts_json = JSON.parse(questions_prompts);
      return questions_prompts_json;
    } catch (error) {
      console.error("Error reading question prompts:", error);
      throw error;
    }
}

const extractQuestionsData = (prompt_responses) => {

    let final_json_sheet = [];
    
    prompt_responses.forEach((prompt_response, index) => {
        const startIndex = prompt_response["prompt_response"].indexOf("```json\n[") + 8;
        const endIndex = prompt_response["prompt_response"].lastIndexOf("]\n```");
        const prompt_response_json = JSON.parse(prompt_response["prompt_response"].slice(startIndex, endIndex+1));
        let resources = {
          "resource_name": prompt_response["resource_name"], 
          "resource_url": prompt_response["resource_url"]
        };
        const short_text = prompt_response["short_text"];
        const sample_input = prompt_response["sample_input"]; 
        let explanation = prompt_response["explanation"];
        const code_language = prompt_response["code_language"].toUpperCase();
        const company = prompt_response["company"];
        const difficulty_level = prompt_response["difficulty_level"] || "XXXX";

        prompt_response_json.forEach(response => {
            let question_data = {};
            let defaultTagNames = ["POOL_1", "TOPIC_PYTHON_CODING_XXXX", "IN_OFFLINE_EXAM"];
            if (resources.resource_name.toUpperCase().includes("ASSESSMENT")) {
              var companyTag = "SOURCE_NI_ASSESSMENT_" + company.toUpperCase();
            }
            else {
              var companyTag = "SOURCE_EXT_ASSESSMENT_" + company.toUpperCase();
            }
            defaultTagNames.push(companyTag);

            if (explanation) {
              explanation = "Let's take an example:\n\n```\n" + sample_input + "\n```\n\n" + explanation;
            }

            question_data["problem_text"] = prompt_response["problem_text"];
            question_data["input_format"] = prompt_response["input_format"] || "";
            question_data["output_format"] = prompt_response["output_format"] || "";
            question_data["short_text"] = short_text;
            question_data["explanation"] = explanation;
            // question_data["question_type"] = "CODING";
            // question_data["question_key"] = index;
            // question_data["skills"] = [];
            // question_data["question_format"] = "CODING_PRACTICE";
            question_data["content_type"] = "MARKDOWN";
            question_data["difficulty"] = difficulty_level.toUpperCase();
            // question_data["remarks"] = "";
            // question_data["scores_updated"] = true;
            question_data["scores_computed"] = 10;
            // question_data["questions_asked_by_companies_info"] = [];
            // question_data["solutions"] = [];
            // question_data["hints"] = [];
            question_data["code_language"] = code_language
            question_data["code_data"] = response["code_data"];
            question_data["constraints"] = prompt_response["constraints"] || "";
            question_data["test_case_input"] = "";
            question_data["test_case_output"] = "";
            question_data["test_case_type"] = "";
            // question_data["cpp_python_time_factor"] = 0;
            // question_data["question_id"] = v4();
            question_data["tag_names"] = 4;
            question_data["resource_name"] = resources["resource_name"];
            question_data["resource_url"] = resources["resource_url"];
            question_data["Exclusions"] = "";
            question_data["Developer Review Remarks\n(Self)"] = "";
            question_data["Review Changes incorporated"] = "";
            question_data["Review Changes Remarks"] = "";
            final_json_sheet.push(question_data);
            
            for (let i=0; i<4; i++) {
              let tag_names = {};
              tag_names["problem_text"] = "";
              tag_names["input_format"] = "";
              tag_names["output_format"] = "";
              tag_names["short_text"] = "";
              tag_names["explanation"] = "";
              // tag_names["question_type"] = "";
              // tag_names["question_key"] = "";
              // tag_names["skills"] = [];
              // tag_names["question_format"] = "";
              tag_names["content_type"] = "";
              tag_names["difficulty"] = "";
              // tag_names["remarks"] = "";
              // tag_names["scores_updated"] = "";
              tag_names["scores_computed"] = "";
              // tag_names["questions_asked_by_companies_info"] = [];
              // tag_names["solutions"] = [];
              // tag_names["hints"] = [];
              tag_names["code_language"] = ""
              tag_names["code_data"] = "";
              tag_names["constraints"] = "";
              tag_names["test_case_input"] = "";
              tag_names["test_case_output"] = "";
              tag_names["test_case_type"] = "";
              // tag_names["cpp_python_time_factor"] = "";
              // tag_names["question_id"] = v4();
              tag_names["tag_names"] = defaultTagNames[i];
              tag_names["resource_name"] = "";
              tag_names["resource_url"] = "";
              tag_names["Exclusions"] = "";
              tag_names["Developer Review Remarks\n(Self)"] = "";
              tag_names["Review Changes incorporated"] = "";
              tag_names["Review Changes Remarks"] = "";
              final_json_sheet.push(tag_names);
            }

            for (let i=1; i<=10; i++) {
                let test_cases = {};
                let test_case = response["test_cases"]["test_cases_"+i];
                test_cases["problem_text"] = "";
                test_cases["input_format"] = "";
                test_cases["output_format"] = ""
                test_cases["short_text"] = "";
                test_cases["explanation"] = "";
                // test_cases["question_type"] = "";
                // test_cases["question_key"] = "";
                // test_cases["skills"] = [];
                // test_cases["question_format"] = "";
                test_cases["content_type"] = "";
                test_cases["difficulty"] = "";
                // test_cases["remarks"] = "";
                // test_cases["scores_updated"] = "";
                test_cases["scores_computed"] = "";
                // test_cases["questions_asked_by_companies_info"] = [];
                // test_cases["solutions"] = [];
                // test_cases["hints"] = [];
                test_cases["code_language"] = ""
                test_cases["code_data"] = "";
                test_cases["constraints"] = "";
                test_cases["test_case_input"] = test_case["input"];
                test_cases["test_case_output"] = test_case["output"];
                test_cases["test_case_type"] = test_case["test_case_type"];
                // test_cases["cpp_python_time_factor"] = "";
                // test_cases["question_id"] = v4();
                test_cases["tag_names"] = "";
                test_cases["resource_name"] = "";
                test_cases["resource_url"] = "";
                test_cases["Exclusions"] = "";
                test_cases["Developer Review Remarks\n(Self)"] = "";
                test_cases["Review Changes incorporated"] = "";
                test_cases["Review Changes Remarks"] = "";
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
