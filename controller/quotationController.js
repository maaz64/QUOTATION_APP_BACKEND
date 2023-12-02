const Quotation = require('../models/quotation');
const User = require('../models/user');


module.exports.getQuotes = async(req,res)=>
{
    try{
    const quotes = await Quotation.find({});
    return res.status(200).json({
        message:"Here is all the quotations",
        data:{quotes}
    })
    }
    catch(err)
    {
        return res.status(500).json({
            message:"Something went wrong while getting the quotations",
            data:{err}
        })
    }
}

module.exports.createQuotes = async(req,res)=>{

    try {
        const{content,userId} = req.body;

        if(!content)
        {
            return res.status(400).json({
                message:"Quotes can't be empty",
                data:{}
            })
        }
        const quotation = await Quotation.create({
            content,
            user:userId,
        });
    
        if(quotation)
        {
            const user = await User.findById(userId);
            user.quotation.push(quotation._id);
            user.save();
            
            res.status(200).json({
                message:"successfully created the quotes",
                data:{quotation}
            })
        }

    } catch (error) {
        res.status(500).json({
            message:"Something went wrong while creating quotes",
            data:{},
            error
        })
    }

}

module.exports.updateQuotes =async(req,res)=>{

    try {
        
        const {content} = req.body;
        const quotationId = req.params.id;

        const quotes = await Quotation.findByIdAndUpdate(quotationId,{content},{new:true});

        if(quotes)
        {
            res.status(200).json({
                message:"Quote Succesfully Updated",
                data:{quotes}
            })
        }
        else{
            res.status(200).json({
                message:"Sorry their is no such quote in the database",
                data:{}
            })
        }


    } catch (error) {
        res.status(500).json({
            message:"Something went wrong while updating quotation",
            data:{},
            error
        })
    }
}

module.exports.deleteQuotes =async (req,res)=>{

    try {
       const quotationId = req.params.id;
        const quotation = await Quotation.findById(quotationId);
        if(!quotation)
        {
        return res.status(200).json({
            message:"Their is no such quotaion in database",
            data:{}
            });
        }
        if(quotation.user != req.user.id)
        {
            return res.status(401).json({
                message:"You are not authorised to delete this post",
                data:{}
            });

        }
        const deletedQuotes = await Quotation.findByIdAndDelete(quotationId);
        req.user.quotation.pop();
        req.user.save();

        return res.status(200).json({
            message:"Successfully deleted the quotes",
            data:{deletedQuotes}
        });
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while deleting quotation",
            data:{} 
        })
    }
}