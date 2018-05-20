class LocalContractStorage {    
    static defineProperty(obj, field, descriptor) {
        if(descriptor) {
            throw new Error("Support descriptor not implemented");
        }
        if(!obj || !field) {
            throw new Error("Invalid arguments");
        }

        Object.defineProperty(obj, field, 
        {
            set: (value) => this[field] = value,
            get: () => this[field]
        });
    }

    static defineMapProperty(obj, field, descriptor) {
        if(!obj || !field) {
            throw new Error("Invalid arguments");
        }
        descriptor = descriptor || this._getDefaultDescriptor(obj);

        Object.defineProperty(obj, field, 
        {
            get: () => this[field] || (this[field] = new TestMap(descriptor))          
        });
    }

    static _getDefaultDescriptor(o) {
        return {
            stringify: (o) => {
                if(!o) {
                    return o;
                }
                return JSON.stringify(o);
            },
            parse: (o) => {
                if(!o) {
                    return o;
                }

                return JSON.parse(o);
            }
        };
    }
}

class TestMap {
    constructor(descriptor) {
        this._descriptor = descriptor;
        this._map = new Map();
    }

    _parse(obj) {  
        if(!obj) {
            return obj;
        }      
        return this._descriptor.parse(obj);
    }

    _stringify(obj) {
        if(!obj) {
            return obj;
        }
        return this._descriptor.stringify(obj);
    }

    put(key, value) {
        this.set(key, value);
    }

    set(key, value) {
        this._map.set(key, this._stringify(value));
    }

    get(key) {
        let value = this._map.get(key);
        return this._parse(value);
    }     

    del(key) {
        map.delete(key);
    }
}


class Blockchain {
    static get transaction(){
        if(this._changeTransactionAfterGet) {
            return this.generateTransaction();
        }

        return {
            from : "n1Ry1HRT39EtXtk6XHSzUUhNe5k8Q9zmixm",
            value : 0
        }  
    }

    static transfer(from, amount) {}

    static get changeTransactionAfterGet() {
        return this._changeTransactionAfterGet;
    }

    static set changeTransactionAfterGet(value) {
        this._changeTransactionAfterGet = value;
    }

    static changeWallet() {
        this.transaction.from = this.generateWallet();
    }

    static changeValue() {
        this.transaction.value = this.generateValue();
    }

    static generateTransaction() {
        return {
            from: this.generateWallet(),
            value: this.generateValue()
        }
    }

    static generateValue() {
        return Math.floor(Math.random() * 1000000000000);
    }

    static generateWallet() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4();
      }
}

exports.Blockchain = Blockchain;
exports.LocalContractStorage = LocalContractStorage;
exports.TestMap = TestMap;

/*-------TEST---------*/

// class TestProfile {    
//     constructor(text) {
//         let obj = text ? JSON.parse(text) : {};
//         this.id = obj.id || 1;
//         this.name = obj.name || "";
//     }

//     toString() {
//         return JSON.stringify(this);
//     }
// }

// class TestContract {
//     constructor() {
//         TestStorage.defineProperty(this, "count");
//         TestStorage.defineMapProperty(this, "profiles", {
//             stringify : (text) => new TestProfile(text),
//             parse: (obj) => obj.toString()
//         });
//     }
// }

// let contract = new TestContract();
// let profile = new TestProfile();
// profile.id = 777;
// profile.name = "John Doe";

// contract.profiles.put("n12mdks", profile);
// console.log(contract.profiles);

// let gettedProfile = contract.profiles.get("n12mdks");
// console.log(gettedProfile);
// console.log(TestStorage);