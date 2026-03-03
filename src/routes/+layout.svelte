<script lang="ts">
    import Head from "$lib/components/Head.svelte";
    import "$lib/styles/_global.scss";

    let { children } = $props();
</script>

<Head />

{@render children()}
