import { loadPyodide } from 'pyodide';
import { initJVM } from 'jvm-wasm';

let pyodide = null;
let jvm = null;

export async function runCode(language, code) {
  try {
    switch (language) {
      case 'python':
        if (!pyodide) {
          pyodide = await loadPyodide();
        }
        return await pyodide.runPythonAsync(code);

      case 'java':
        if (!jvm) {
          jvm = await initJVM();
        }
        return await jvm.runJavaCode(code);

      case 'kotlin':
        if (!jvm) {
          jvm = await initJVM();
        }
        return await jvm.runKotlinCode(code);

      case 'javascript':
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        return await new AsyncFunction(code)();

      default:
        throw new Error(`Language ${language} is not supported for execution`);
    }
  } catch (error) {
    throw new Error(`Execution error: ${error.message}`);
  }
}