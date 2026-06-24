import { defineStore } from "pinia";
import { ref } from 'vue'

export const useResApiInteractionStore = defineStore('resApiInteraction', () => {
const NameApiKey = ref('')
const NameToolKey = ref('')
function setNameApiKey(nameKey: string) {
    NameApiKey.value = nameKey
}
function setNameToolKey(nameKey: string) {
    NameToolKey.value = nameKey
}
return {
    NameApiKey,
    setNameApiKey,
    NameToolKey,
    setNameToolKey
}
})