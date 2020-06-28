import * as React from "react";

export default function getFileName(name, extension) {
    var curDate = new Date();
    var y = curDate.getFullYear();
    var d = curDate.getDate();
    var m = curDate.getMonth() + 1;
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;

    return '' + mm + '-' + dd + '-' + y + '-' + name + extension;
  }