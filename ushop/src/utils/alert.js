import Vue from 'vue'
let vm = new Vue()

export let successAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
    })
}


export let errorAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
    })
}