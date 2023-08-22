import fs from "fs";
import { v4 } from "uuid";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const questions_response_path = "./responses_json/" + parent_json_file_name + "_responses.json";
const final_responses_path = "./coding_responses/" + parent_json_file_name + "_coding.json";

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
        const short_text = prompt_response["short_text"];
        const startIndex = prompt_response["prompt_response"].indexOf("[");
        const endIndex = prompt_response["prompt_response"].lastIndexOf("]");
        console.log(prompt_response["prompt_response"].slice(startIndex, endIndex+1).slice(150, 193));
        const prompt_response_json = JSON.parse(prompt_response["prompt_response"].slice(startIndex, endIndex+1));
        let resources = {
          "resource_name": prompt_response["resource_name"], 
          "resource_url": prompt_response["resource_url"]
        };
        const code_language = prompt_response["code_language"].toUpperCase();


        prompt_response_json.forEach((response, index) => {
            let question_data = {};
            let defaultTagNames = ["POOL_1"];
            const sourceTag = "SOURCE_" + resources["resource_name"].toUpperCase();
            const question_text = response["problem_text"] + "<hr /> <h3>Input:</h3>\n" + response["input"] + "<hr /> <h3>Output:</h3>\n" + response["output"] + "<hr /> <h3>Sample Input:</h3>\n" + response["sample_input"] + "\n\n### Sample Output:\n" + response["sample_output"] + "\n\n### Explanation:\n" + response["explanation"] + "<hr /> <h3>Constraints:</h3>\n" + response["constraints"];
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
                if (i === 1 || i === 2) {is_hidden = false;}
                let test_case = response["test_cases"]["test_case_"+i];
                let input = {
                    "input": test_case.slice(7, test_case.indexOf("Output: ")),
                    "output": test_case.slice(test_case.indexOf("Output: ") + 8, ),
                    "is_hidden": is_hidden,
                    "score": 1,
                    "testcase_type": "DEFAULT",
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
                  "default_code": false,
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
                metadata["default_code"] = true;
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
