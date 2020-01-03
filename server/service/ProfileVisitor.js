const ProfileVisitor=require('./../models/ProfileVisitor');
const log=require('./../logger');
module.exports={
    addUser:(body)=>{
        return new Promise((resolve,reject)=>{
            const newProfileVisitor=new ProfileVisitor({
                ...body
            })
            newProfileVisitor.save().then((result)=>{
               // log.info('newProfileVisitor ',result)
                resolve(result);
            }).catch(err=>{
                log.error( err)
                reject(err)
            })

        })
    },
    removeUser:(sockedId)=>{
        return new Promise((resolve,reject)=>{
           ProfileVisitor.deleteOne({socket_id:sockedId}).then((result)=>{
               log.info('socket id removed ',result)
               resolve(result)
           }).catch(err=>{
               log.error(err)
               reject(err)
           })
        })
    },
    noOfVisitors:(profile_id)=>{
        return new Promise((resolve,reject)=>{
            ProfileVisitor.find({profile_id:profile_id}).distinct("email_id").then((result)=>{
                log.info('Visitors ',result)
                resolve(result.length)
            }).catch(err=>{
                log.error(err)
                reject(err)
            })
        })
    },
    getProfileIdBySocketId:(socketId)=>{
        return new Promise((resolve,reject)=>{
            ProfileVisitor.findOne({socket_id:socketId}).then((result)=>{
                log.info('getProfileIdBySocketId ',result.profile_id)
                resolve(result.profile_id)
            }).catch(err=>{
                log.error(err);
                reject(err)
            })
        })
    }

}