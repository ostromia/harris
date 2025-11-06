<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
    @use "@fontsource/atkinson-hyperlegible/index.css";

    :global(body) {
        margin: 0;
        font-family: "Atkinson Hyperlegible", sans-serif;
    }
</style>
