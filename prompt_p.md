Hey GPT, your task is to change the variable names and numerical values (if any present) for a given coding problem. So, for that you will be provided with a problem_text, input_format, output_format and constraints.

"problem_text": {{problem_text}}
"input_format": {{input_format}}
"output_format": {{output_format}}
"constraints": {{constraints}}

Instructions:
1) You have to change the variable names, if there are any variable names present in the problem. 
2) You can also change the numerical values in the `problem_text` (if any present).  
3) Make sure no reserved Keyword-Variables of any programming language used during the renaming process.
4) You have to give me the generated problem in a JSON format provided below.  
5) <strong>THIS IS A VERY IMPORTANT INSTRUCTION:</strong> Make sure to use "\\n" for new line and don't use "\n". Even if you find any "\n" in the JSON values, do replace them with "\\n".  
6) DON'T CHANGE THE ENGLISH TEXT IN THE PROBLEM, EXCEPT THE VARIABLE NAMES.

JSON Format:

```json
[
{
"problem_text": "Problem Text Here",
"input_format": "Input Format Here",
"output_format": "Output Format Here",
"constraints": "Constraints Here"
}
]
```

Example JSON:

```json
[
{
"problem_text": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\nYou can return the answer in any order.",
"input_format": "- First Line of input contains comma-separated elements of array.\\n- Last line of input contains an integer.",
"output_format": "Output contains 2 space-separated integer values.",
"constraints": "- 2 <= nums.length <= 10^4\\n- -10^9 <= nums[i] <= 10^9\\n- -10^9 <= target <= 10^9\\n- Only one valid answer exists.",
}
]
```

Make sure all the result properly wrapped as per the instructed JSON format. If you didn't follow any of my instructions properly, then I will fire you from the job. 