import { defineStore } from "pinia";
import { ref } from 'vue'

export   const useResApiInteractionStore = defineStore('resApiInteraction', () => {
const NameApiKey = ref('')
const NameToolKey = ref('')
function setNameApiKey(nameKey: string) {
    NameApiKey.value = nameKey
    console.log(NameApiKey.value);

}
function setNameToolKey(nameKey: string) {
    NameToolKey.value = nameKey
    console.log('修改了工具键', NameToolKey.value);
}
return {
    NameApiKey,
    setNameApiKey,
    NameToolKey,
    setNameToolKey
}
})