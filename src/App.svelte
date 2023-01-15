<script>
    import { db } from "./firebase";
    import {
        onSnapshot,
        collection,
        addDoc,
        deleteDoc,
        doc,
        updateDoc,
    } from "firebase/firestore";
    import Toastify from "toastify-js";
    import { onDestroy } from "svelte";

    let task = {
        title: "",
        description: "",
    };

    let tasks = [];
    let editStatus = false;
    let currentId = "";

    const handleSubmit = async () => {
        try {
            if (!editStatus) {
                addTask();
            } else {
                updateTask();
            }
        } catch (error) {
            console.error(error);
        }

        task = {
            title: "",
            description: "",
        };
        editStatus = false;
        currentId = false;
    };

    const unsub = onSnapshot(
        collection(db, "tasks"),
        (querySnapshot) => {
            tasks = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            console.log(tasks);
        },
        (error) => {
            console.log(error);
        }
    );

    onDestroy(unsub);

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
            Toastify({
                text: "task deleted",
            }).showToast();
        } catch (error) {
            console.error(error);
        }
    };

    const editTask = (currentTask) => {
        task.title = currentTask.title;
        task.description = currentTask.description;
        currentId = currentTask.id;
        editStatus = true;
    };

    const addTask = async () => {
        try {
            await addDoc(collection(db, "tasks"), {
                ...task,
                createdAt: new Date(),
            });
            console.log("task saved");
            Toastify({
                text: "new task created",
            }).showToast();
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async () => {
        try {
            await updateDoc(doc(db, "tasks", currentId), task);
            Toastify({
                text: "task updated",
            }).showToast();
        } catch (error) {
            console.error(error);
        }
    };
</script>

<main>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-6">
                <form
                    on:submit|preventDefault={handleSubmit}
                    class="card card-body p-5"
                >
                    <div class="mb-3">
                        <label for="title" class="text-secondary fs-5"
                            >Title</label
                        >
                        <input
                            type="text"
                            placeholder="Write a title"
                            bind:value={task.title}
                            class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="text-secondary fs-5">Description</label>
                        <textarea
                            id="description"
                            rows="3"
                            placeholder="Write a description"
                            bind:value={task.description}
                            class="form-control"
                        />
    
                    </div>

                    <div>
                        <button class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>

            <div class="col-md-6">
                {#each tasks as task}
                    <div class="card card-body mt-2">
                        <div class="d-flex justify-content-between">
                            <h5>{task.title}</h5>
                            <button on:click={editTask(task)}>
                                <i class="material-icons">edit</i>
                            </button>
                        </div>
                        <p>{task.description}</p>

                        <div>
                            <button
                                class="btn btn-danger d-flex align-content-center justify-content-center"
                                on:click={deleteTask(task.id)}
                            >
                                <i class="material-icons">delete_forever</i> Delete
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>
