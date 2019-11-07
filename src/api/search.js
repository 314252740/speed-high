import request from "@/utils/request.js"

export default function searchList (query) {
  return request({
    url: "module/query_hit",
    method: "get",
    params: {
      keyword: query,
      indexName: "nxindex",
      fields: "ip,name,longitude,latitude,roadCode,ip,manufacturer,note,serviceName,plateNum,types,names"
    }
  })
}
