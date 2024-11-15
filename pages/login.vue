
<script setup>
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

const auth = useFirebaseAuth()
const router = useRouter()

function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
        .then(() => router.replace('/'))
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="card text-center mt-3">
                    <div class="card-header">
                        Log in to continue
                    </div>
                    <div class="card-body d-grid gap-2">
                        <button @click="signInWithGoogle" class="btn btn-outline-primary">Sign In with Google</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>