<script lang="ts">
    import type { Project } from "../types";
    let {
        project
    }: {
        project: Project
    } = $props();
</script>

<div class="flex flex-col shadow-sm shadow-secondary p-2 hover:cursor-pointer hover:underline hover:text-accent">
    <div class="text-xl text-accent">
        <h1>{project.name}</h1>
    </div>
    <p>{project.description}</p>
</div>