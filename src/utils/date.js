// tiem 传递过来的时间
export function getTimers(tiem) {
  const data = new Date(tiem); //后台传过来的时间   我们需要转化成年月日//yyyy-MM-dd HH:mm:ss
  //yyyy-MM-dd 
  const yyyy = data.getFullYear(); //年
  const MM = (data.getMonth() + 1 + '').padStart(2, 0); //月 //getMonth 是从0开始的  所以要加1  加1之后就变成了真正的月份了  希望不足两位 在前面补个0
  //  所以要放到（data.getMonth() + 1）里面 吊用字符串函数  先变成字符串（data.getMonth() + 1 + ''）
  //  调用字符串函数 .padStart(2,'0')  2是总长度为2位  不足两位补上0

  const dd = (data.getDate() + '').padStart(2, 0); //日
  // HH: mm: ss
  const hh = (data.getHours() + '').padStart(2, 0); //时
  const mm = (data.getMinutes() + '').padStart(2, 0); //分
  const ss = (data.getSeconds() + '').padStart(2, 0); //秒
  // 星期几
  const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',]
  const xingqi = data.getDay(); //星期几
  // return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss} ${arr[xingqi]}`
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}}`
}