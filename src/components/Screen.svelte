<script lang="ts">
    import { onMount } from "svelte";
    import { Screen } from "../render/screen";

    let screenElement = $state<HTMLCanvasElement | null>(null);
    let screen = $state<Screen | null>(null);

    onMount(() => {
        let check = true;
        console.log(check);

        while (check) {
            console.log(screenElement);
            if (!screenElement) return;

            screen = new Screen(screenElement);
            screen.frame();
            check = false;
        }
    });
</script>

<canvas id="screen" bind:this={screenElement} class="h-screen w-full">
    This component contains a presentation. If you are using a screen reader,
    you will hear the contents after this message ends. However, if you are
    seeing this text, then your browser does not support the canvas element.
    Please switch to a modern alternative. [TODO: PROVIDE INFO IN TEXT]
</canvas>

<!-- svelte-ignore css_unused_selector -->
<style>
    #canvas {
        image-rendering: pixelated;
    }
</style>
