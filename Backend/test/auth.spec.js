// const chai =require('chai')
// const chaiHttp=require('chai-http')
// const server =require('../app')
// let {superAdminTestToken}=require('../config/config')
// //Assertion style
// chai.should()
// chai.use(chaiHttp)
// describe('Institute API', ()=>{
//     /*
//         Test View All Instritute route here
//     */
//    describe('POST /api/institute', ()=>{
//        it('Accessing user must be super admin and must return all institutes', (done)=>{
//            chai.request(server)
//             .post('/api/institute')
//             .set({'x-auth-token': superAdminTestToken})
//             .end((err, response)=>{
//                response.should.have.status(200)
//                //console.log(response.body)
//                response.body.should.have.property('message')
//                response.body.should.have.property('institute')
//             done()
//             })
//        })
//    })
//    /*
//         Test View All Admins route here
//     */
   
// })