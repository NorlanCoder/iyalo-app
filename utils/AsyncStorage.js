import AsyncStorage from "@react-native-async-storage/async-storage"

export const getOnboarding = async () => {
    try {
        const value = AsyncStorage.getItem('onboarding');
        return value != null ? JSON.parse(value) : null;
    } catch(error) {
        console.log("Une erreur est subvenu lors de la récupération de la valeur");
    }
}

export const setOnboarding = async () => {
    try {
        const value = AsyncStorage.setItem('onboarding',true);
        return value != null ? JSON.parse(value) : null;
    } catch(error) {
        console.log("Une erreur est subvenu lors de la l'insertion de la valeur");
    }
}