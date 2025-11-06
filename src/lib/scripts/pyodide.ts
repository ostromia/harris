import { loadPyodide } from "pyodide";
import type { PyodideInterface } from "pyodide";

class Pyodide {
    pyodide!: PyodideInterface;

    async initialise() {
        this.pyodide = await loadPyodide();
        await this.pyodide.runPythonAsync(`import io\nimport sys\nsys.stdout = io.StringIO()`);
    }

    async interpret(input: string): Promise<string> {
        let output: string = "";

        try {
            await this.pyodide.runPythonAsync(`${input}`);
            output = this.pyodide.runPython("sys.stdout.getvalue()");
            this.pyodide.runPython("sys.stdout = io.StringIO()");
        } catch (e) {
            if (e instanceof Error) {
                output = e.toString();
            }
        }

        return output;
    }
}

export default Pyodide;
