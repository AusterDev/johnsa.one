<script lang="ts">
    import { onMount } from "svelte";
    import { Screen } from "../render/screen";
    import { KeyInputProcessor } from "../processor/input.processor";

    let screenElement = $state<HTMLCanvasElement | null>(null);
    let screen = $state<Screen | null>(null);
    let keyboard = $state<KeyInputProcessor | null>(null);

    function onkeydown(
        e: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!keyboard) return;

        keyboard.onkeyDown(e);
    }

    function onkeyup(
        e: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!keyboard) return;

        keyboard.onKeyUp(e);
    }

    onMount(() => {
        let check = true;

        while (check) {
            if (!screenElement) return;

            keyboard = new KeyInputProcessor();
            screen = new Screen(screenElement, keyboard);
            screen.frame();
            check = false;
        }
    });
</script>

<svelte:window on:keydown={onkeydown} on:keyup={onkeyup} />
<canvas id="screen" bind:this={screenElement} width={window.innerWidth} height={window.innerHeight}>
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
