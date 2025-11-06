<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import CodeMirror from "$lib/components/CodeMirror.svelte";
    import { python as pythonLanguageSupport } from "@codemirror/lang-python";

    let editor = $state() as CodeMirror;
    let console = $state() as CodeMirror;

    function file_new() {
        if (editor.getText().trim()) {
            const confirmation = confirm("Your changes will be lost if you don't save them.");
            if (confirmation) {
                editor.setText("");
            }
        } else {
            editor.setText("");
        }
    }

    async function file_open() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".py";

        const file: File = await new Promise((resolve, reject) => {
            input.onchange = () => {
                if (input.files && input.files[0]) {
                    resolve(input.files[0]);
                } else {
                    reject(new Error("No file selected"));
                }
            };
            input.click();
        });

        const file_text = await file.text();

        if (editor.getText().trim()) {
            const confirmation = confirm("Your changes will be lost if you don't save them.");
            if (confirmation) {
                editor.setText(file_text);
            }
        } else {
            editor.setText(file_text);
        }
    }

    function _save_text_as_file(text: string, fileName: string): void {
        const file = new Blob([text]);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function file_save() {
        _save_text_as_file(editor.getText(), "untitled.py");
    }

    function edit_undo() {
        editor.undo();
    }

    function edit_redo() {
        editor.redo();
    }

    async function edit_cut() {
        if (editor.isRange()) {
            const range = editor.getRange();
            const selection = editor.getText(...range);

            await navigator.clipboard.writeText(selection);
            editor.setText("", ...range);
            editor.focus();
        }
    }

    async function edit_copy() {
        if (editor.isRange()) {
            const range = editor.getRange();
            const selection = editor.getText(...range);

            await navigator.clipboard.writeText(selection);
        }
    }

    async function edit_paste() {
        if (editor !== undefined) {
            editor.setText(await navigator.clipboard.readText(), ...editor.getRange());
        }
    }

    async function run_interpret_python_code() {
        console.setText(editor.getText());
    }
</script>

<Nav
    menubar={[
        {
            name: "File",
            items: [
                { name: "New", action: file_new },
                { name: "Open", action: file_open },
                { name: "Save", action: file_save }
            ]
        },
        {
            name: "Edit",
            items: [
                { name: "Undo", action: edit_undo },
                { name: "Redo", action: edit_redo },
                { name: "Cut", action: edit_cut },
                { name: "Copy", action: edit_copy },
                { name: "Paste", action: edit_paste }
            ]
        },
        {
            name: "Run",
            items: [{ name: "Interpret Python Code", action: run_interpret_python_code }]
        }
    ]}
/>

<main>
    <CodeMirror bind:this={editor} filetype={[pythonLanguageSupport()]} display={true} />

    <CodeMirror bind:this={console} linenumbers={false} editable={false} />
</main>

<style lang="scss">
    main {
        overflow: hidden;

        padding: 0.25rem;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "h0 h1" "e0 e1";
        gap: 0.25rem;
    }
</style>
