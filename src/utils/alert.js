import Vue from "vue"

let nv = new Vue()


export let sucalert = (msg) =>{
    nv.$notify({
        title: '成功',
        message: msg,
        type: 'success'
      });
}

export let warnalert = (msg) =>{
    nv.$notify.error({
        title: '错误',
        message: msg
      });
}