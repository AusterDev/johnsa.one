<script lang="ts">
    import type { Project } from "../types";
    import ProjectItem from "./ProjectItem.svelte";

    let {
        projects,
    }: {
        projects: Project[];
    } = $props();

    let selectedProject = $state<Project | null>(null);

    function selectProject(id: string) {
        const project = projects.find((p, i, obj) => p.id === id);
        if (!project) return;
        selectedProject = project;
    }
</script>

<div>
    <div class="flex h-screen justify-between">
        <div
            class="flex-2/3 border-r-1 border-zinc-600 p-10 flex justify-center"
        >
            <div class="shadow-sm shadow-secondary w-full p-10 space-y-10">
                <h2 class="text-2xl text-secondary font-extrabold">
                    projects i am working/have worked on
                </h2>
                <div class="flex flex-col space-y-4">
                    {#each projects as project}
                        <!-- svelte-ignore a11y_positive_tabindex -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div
                            onclick={(e) => {
                                e.preventDefault();
                                selectProject(project.id);
                            }}
                            role="button"
                            tabindex="4"
                        >
                            <ProjectItem {project} />
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        {#if selectedProject}
            <div class="md:flex-1/3 p-10 md:static h-screen bg-primary absolute w-full sm:bg-primary sm:h-screen flex flex-col justify-between">
                <div class="flex-1/2 flex flex-col space-y-3">
                    <div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <p onclick={(e) => {
                        e.preventDefault();
                        selectedProject = null;
                    }} class="mb-10 md:hidden hover:cursor-pointer hover:text-accent">
                        [ back ]
                    </p>

                        <span class="font-extrabold text-accent text-4xl">
                        {selectedProject.name}
                    </span>
                    <span>
                        : {selectedProject.description}
                    </span>
                    </div>

                    <div class="border-secondary max-h-140">
                        {selectedProject.extendedDescription ||
                            "Extended description is not available for this"}
                    </div>
                </div>

                <div class="flex flex-row space-between">
                    <a
                        class="flex-1/2 text-secondary hover:text-accent hover:underline w-1/2"
                        href={selectedProject.repo}>view repo</a
                    >
                    <a
                        class="text-primary p-2 bg-secondary hover:underline"
                        href={selectedProject.repo}>visit link</a
                    >
                </div>
            </div>
        {/if}
        {#if !selectedProject}
            <div class="md:flex-1/3 hidden p-2 md:flex justify-center items-center">
                <div
                    class="font-bold text-xl text-accent border-b border-accent p-2"
                >
                    Select a project
                </div>
            </div>
        {/if}
    </div>
</div>
