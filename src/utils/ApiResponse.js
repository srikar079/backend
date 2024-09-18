class ApiResponse{
    constructor(statusCode, data, meessage = "success"){
        this.statusCode=statusCode
        this.data=data
        this.meessage=meessage
        this.success=statusCode <400
    }
}