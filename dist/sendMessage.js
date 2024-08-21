"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendMessage;
function sendMessage(webhookUrl, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({ username: "Issue Tracker", avatar_url: "https://cdn.discordapp.com/attachments/1261742215265255426/1275173490575671347/Bug.jpg?ex=66c4ed5b&is=66c39bdb&hm=fe924ba2a4f9055fb11b318009f065bd4039946288428ddcdf325899b34e549f&" }, payload)),
        })
            .then((res) => {
            if (res.ok) {
                console.log("Message sent successfully");
            }
            else {
                console.warn(`Connection was successful but could not send message: ${res.status}`);
            }
        })
            .catch((err) => {
            console.error(`Could not send message: ${err}`);
        });
    });
}
