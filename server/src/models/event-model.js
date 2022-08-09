const mongoose = require('mongoose');
const validator = require('validator');
const { date } = require('yup');

const eventSchema = new mongoose.Schema(
    {
        userEvent: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "The captain is required"],
        },
        userData: [{
            type: Object,
            contains: {
                eventId:{
                    type: Number,
                },
                eventName: {
                    type: String,
                    required: [true, 'The Event Name is required']
                },
                eventCountry: {
                    type: String,
                    required: [true, 'The Event Name is required']
                },
                eventRegion: {
                    type: String,
                    required: [true, 'The Event Name is required']
                },
                eventStartDate: {
                    type: Date,
                    required: [true, 'The Event start date is required']
                },
                eventEndtDate: {
                    type: Date,
                    required: [true, 'The Event end date is required']
                },
                eventTime: {
                    type: date,
                    required: [true, 'The eventTime end date is required']
                }
            }
        }]
    },

);

const EventModel = new mongoose.model("event", eventSchema)

module.exports = EventModel;