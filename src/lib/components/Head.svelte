<script lang="ts">
    import { VERSION } from "svelte/compiler";

    import favicon from "$lib/assets/favicon.svg";

    const title = "Harris";
    const description = "Static Client Side Python Interpreter Built Using SvelteKit and Pyodide";
    const canonical = "https://ostromia.github.io/harris/";
</script>

<svelte:head>
    <!-- Global Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={`SvelteKit ${VERSION}`} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Favicon -->
    <link rel="icon" href={favicon} />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonical} />
</svelte:head>
