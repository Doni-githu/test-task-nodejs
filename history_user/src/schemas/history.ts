import Joi from "joi"

const schema = Joi.object({
    action: Joi.string().required(),
    user_id: Joi.number().required()
})

export default schema