Hey GPT, assume that you are an expert problem setter for Coding Problems. Your task is to generate the test cases and code solution for a given coding problem. So for that you will be provided with a problem_text, input_format, output_format and constraints for the given problem.

"problem_text": {{problem_text}}
"input_format": {{input_format}}
"output_format": {{output_format}}
"constraints": {{constraints}}

Test Case Types: 
1) BOUNDARY_CASE: These test cases focus on the extreme values of inputs. For example, if the problem involves integers, boundary test cases might involve testing the smallest and largest possible values. These cases help uncover issues with integer overflows, underflows, and edge cases.
2) NORMAL_CASE: These are typical scenarios that you might encounter with average or common input values. They test the main logic of your code and check if it produces the expected results.
3) EDGE_CASE: These test cases explore the edges of the input space. They involve inputs that are just slightly outside the normal range. Edge test cases are designed to identify off-by-one errors or other issues that might arise near the boundaries of input values.
4) NEGATIVE_CASE: These cases test the behavior of your code when it encounters invalid or unexpected inputs. This can include passing null values, negative numbers to functions that expect positive values, or non-numeric inputs to numeric functions.

Instructions:
1) You have to generate 10 new and unique test cases for the given coding problem.
2) Make sure to generate test cases from all the four types of test cases that are described above and basing on that desciption of the test case types, assign the appropriate "test_case_type" value to each test case.  
3) You also have to generate the {{code_language}} code as solution at "code_data" field in JSON.  
4) You have to generate the output only in the below prescribed JSON format.  
5) All the test cases has to be strictly generated as per the "problem_text", "input_format", "output_format" and "constraints".  
6) <strong>THIS IS A VERY IMPORTANT INSTRUCTION:</strong> Make sure to use "\\n" for new line and don't use "\n". Even if you find any "\n" in the JSON values, do replace them with "\\n".

JSON Format:

```json
[
{
"code_data": "CODE SOLUTION HERE",
"test_cases": {
    "test_cases_1": {
    "input": "TEST CASE INPUT HERE",
    "output": "TEST CASE OUTPUT HERE",
    "test_case_type": "TYPE OF TEST CASE HERE"
},
"test_cases_2": {
    "input": "TEST CASE INPUT HERE",
    "output": "TEST CASE OUTPUT HERE",
    "test_case_type": "TYPE OF TEST CASE HERE"
},
"test_cases_3": {
    "input": "TEST CASE INPUT HERE",
    "output": "TEST CASE OUTPUT HERE",
    "test_case_type": "TYPE OF TEST CASE HERE"
},
.
.
.
"test_cases_10": {
    "input": "TEST CASE INPUT HERE",
    "output": "TEST CASE OUTPUT HERE",
    "test_case_type": "TYPE OF TEST CASE HERE"
}
}
}
]
```

Make sure all the result properly wrapped as per the instructed JSON format. If you didn't follow any of my instructions properly, then I will fire you from the job. 