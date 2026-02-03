import mongoose, {Schema, Document} from "mongoose";

export interface IBank extends Document {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

const BankSchema: Schema = new Schema({
    bankName: {type: String, required: true},
    accountNumber: {type: String, required: true},
    accountName: {type: String, required: true},
}, {timestamps: true});

export default mongoose.model<IBank>("Bank", BankSchema);