<script setup>
import {signOut} from 'firebase/auth'

const auth = useFirebaseAuth()
const user = useCurrentUser()

function handleSignOut() {
    signOut(auth)
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card card-body test-center mt-3">
                    {{ user.displayName }}
                    <button @click="handleSignOut" class="btn btn-link">sign out</button>
                </div>
                <div class="card card-body text-center mt-3">
                    <h1>This is the main page</h1>
                </div>
            </div>
        </div>
    </div>
</template>