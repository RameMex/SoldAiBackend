class Message {

    constructor(id,name,message){
        this.id = id;
        this.name=name;
        this.message=message;
    }

    verifyId(){
        if(Number.isInteger(this.id) ){
            return this.id;
        }else{
            return 'Problemas con el ID';
        }
    }
    verifyName(){
        if(!(typeof this.name == 'undefined')){
            if(typeof this.name == 'string'){
                return this.name;
            }else{
                return 'Problemas con el Nombre';
            }
        }
        return 'Esta vacio';
    }
    verifyMessage(){
        if(!(typeof this.name== 'undefined')){
            if(typeof this.name == 'string'){
                return this.name;
            }else{
                return 'Problemas con el mensaje';
            }
        }
        return 'Esta Vacio';
    }
}