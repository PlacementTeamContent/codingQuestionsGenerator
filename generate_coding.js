import fs from "fs";
import { v4 } from "uuid";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const responses_testcase_json_path = "./responses_testcase_json/" + parent_json_file_name + "_r_testcase.json";
const coding_responses_path = "./coding_responses/" + parent_json_file_name + "_coding.json";

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

const difficulty_level = {
  "0" : "EASY",
  "1" : "MEDIUM",
  "2" : "HARD"
}

const extractQuestionsData = (prompt_responses) => {

    let final_json_sheet = [];
    
    prompt_responses.forEach((prompt_response, index) => {
        const problem_text = prompt_response["problem_text"];
        const short_text = prompt_response["short_text"];
        const input_format = prompt_response["input_format"];
        const output_format = prompt_response["output_format"];
        const constraints = prompt_response["constraints"];
        const company = prompt_response["company"] || "UNKNOWN";
        const startIndex = prompt_response["prompt_response"].indexOf("```json\n[") + 8;
        const endIndex = prompt_response["prompt_response"].lastIndexOf("]\n```");
        console.log(index, short_text);
        let prompt_response_str = prompt_response["prompt_response"].slice(startIndex, endIndex+1);
        prompt_response_str.replaceAll("\\\\n", "\\n");

      const prompt_response_json = JSON.parse(prompt_response_str);
        let resources = {
          "resource_name": prompt_response["resource_name"], 
          "resource_url": prompt_response["resource_url"]
        };
        const code_language = prompt_response["code_language"].toUpperCase();


        prompt_response_json.forEach(response => {
            let question_data = {};
            let defaultTagNames = ["POOL_1"];
            const sourceTag = "SOURCE_" + resources["resource_name"].toUpperCase();
            const companyTag = "SOURCE_CODING_" + company.toUpperCase();
            let question_text = problem_text + "<hr /> <h3>Input:</h3>\n" + input_format + "<hr /> <h3>Output:</h3>\n" + output_format;
            if (constraints) {
              question_text += "<hr /> <h3>Constraints:</h3>\n" + constraints;
            }
            defaultTagNames.push(companyTag);
            defaultTagNames.push(sourceTag);
            
            let input_output = [
                {
                    "input": [],
                    "average_time_spent": 0.0,
                    "order_no": 100
                }
            ];

            for (let i=1; i<=10; i++) {
                let is_hidden = true;
                let test_case = response["test_cases"]["test_cases_"+i];
                let count_of_non_hidden_cases = 0;
                if (test_case["test_case_type"].toUpperCase() === "NORMAL_CASE" && count_of_non_hidden_cases < 2) {
                  is_hidden = false;
                  count_of_non_hidden_cases += 1;
                }
                let input = {
                    "input": test_case["input"],
                    "output": test_case["output"],
                    "is_hidden": is_hidden,
                    "score": 1,
                    "testcase_type": test_case["test_case_type"].toUpperCase(),
                    "t_id": i
                }
                input_output[0]["input"].push(input);
            }
            question_data["input_output"] = input_output;
            question_data["question_text"] = question_text;
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
            question_data["test_case_evaluation_metrics"] = [
                { "language": "C", "time_limit_to_execute_in_seconds": 2.01 },
                { "language": "CPP", "time_limit_to_execute_in_seconds": 2.01 },
                { "language": "PYTHON", "time_limit_to_execute_in_seconds": 10.01 }
            ];
            question_data["solutions"] = [];
            question_data["hints"] = [];
            question_data["code_metadata"] = [
                {
                  "is_editable": true,
                  "language": "PYTHON",
                  "code_data": "",
                  "default_code": true,
                  "base64_encoded": false
                },
                {
                  "is_editable": true,
                  "language": "C",
                  "code_data": "",
                  "default_code": false,
                  "base64_encoded": false
                },
                {
                  "is_editable": true,
                  "language": "CPP",
                  "code_data": "",
                  "default_code": false,
                  "base64_encoded": false
                },
                {
                  "is_editable": true,
                  "language": "JAVA",
                  "code_data": "",
                  "default_code": false,
                  "base64_encoded": false
                },
            ];
            question_data["code_metadata"].forEach(metadata => {
              if (metadata["language"] === code_language) {
                metadata["code_data"] = response["code_data"];
              }
              if (metadata["language"] === "PYTHON") {
                metadata["language"] = "PYTHON39";
              }
            })
            question_data["cpp_python_time_factor"] = 0;
            question_data["question_id"] = v4();
            question_data["tag_names"] = defaultTagNames;
            final_json_sheet.push(question_data);
        });
    });
    console.log("\nWriting into file\n");
    const jsonData = JSON.stringify(final_json_sheet);
  fs.writeFile(coding_responses_path, jsonData, 'utf8', (err) => {
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
