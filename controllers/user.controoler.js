const express = require("express");

const transporter = require("../configs/mail");

const user = require("../models/user.module")

const router = express.Router();

router.get("/", async(req, res)=>{

    try{
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;

        const skip = (page - 1)* pagesize; 

        const user = await user.find.skip(skip).limit(pagesize).lean().exec();

        const totalPages = Math.ceil(
            (await user.find().countDocuments()) / pagesize
        );
        return res.status(200).send({user, totalPages});
    }catch(err){
        return res.status(500).send({message: err.message});
    }
});

router.post("/", async (req, res) => {
    try{
        const user = await user.create(req.body);

        transporter.sendMail({
            from: '"Amazon admin" <admin@amazon.com>', // sender address
            to: product.sellerEmail, // list of receivers
            subject: "Your Product is successfully created", // Subject line
            text: "Hello sir/madam your product is successfully created", // plain text body
            //   html: "<b>Hello sir/madam your product is successfully created</b>", // html body
            alternatives: [
              {
                contentType: "text/html",
                path: path.join(__dirname, "../mailers/product-created.mail.html"),
              },
              {
                filename: "product.txt",
                path: path.join(__dirname, "../mailers/product-details.txt"),
              },
            ],
          });
      
          return res.status(201).send({ message: "Product created successfully" });
        


    } catch(err){
        console.log(err)
    }
})

module.exports = router;