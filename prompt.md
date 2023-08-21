Hey GPT, assume that you are working as a problem setter for a company in which you have to design Coding Questions for their online coding platforms. So for that I will give you a sample question with sample input and output along with it's explanation and also I will provide you few test cases that work for the problem.

Things you have to do:
1) You have to paraphrase the problem and if there are any variables present in the problem, then change those variable names.
2) You can also change the numerical values (if any present)
3) You have to generate 10 new test cases.
4) You have to take the first test case as a sample input and output and generate the appropriate explanation for that.
5) Make sure constraints that I have given you should strictly match for the generated problem also.
6) You also have to generate me the Python code solution for this problem at the "code_data" field in the JSON.
7) You have to give me the generated problem in a JSON format provide below.

JSON Format:

```json
[
{
"problem_text": "Problem Text Here",
"sample_input": "Sample Input Here",
"sample_output": "Sample Output Here",
"explanation": "Explanation Here",
"code_data": "Python Solution Code Here",
"constraints": "Constraints Here",
"test_cases": {
    "test_case_1": "Input & Output of Test Case-1 Here",
    "test_caes_2": "Input & Output of Test Case-2 Here",
    "test_caes_3": "Input & Output of Test Case-3 Here",
    .
    .
    .
    "test_case_10": "Input & Output of Test Case-10 Here"
}
}
]
```

Problem: "{{problem_text}}"

Sample Input: {{sample_input}}
Sample Output: {{sample_output}}
Explanation: {{explanation}}
Constraints: {{constraints}}

Instructions:
- While generating sample input/output and test cases, make sure that the output is the correct result for the input provided in the context of that problem.
- Python code solution must be present at the "code_data" field in the JSON mandatorily, otherwise I will bang you on your face.
- Give the generated results in the prescribed JSON format only.

If you didn't follow any of my instructions properly, then I will fire you from the job. Make sure to follow proper JSON format.