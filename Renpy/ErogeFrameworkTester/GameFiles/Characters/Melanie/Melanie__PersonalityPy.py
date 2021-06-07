import PowerPlayFramework.CharacterSystems.CharactersBasePy as CharactersBasePy
import PowerPlayFramework.CharacterSystems.CharacterFundamentsPy as CharacterFundamentsPy
import PowerPlayFramework.CharacterSystems.CharacterPersonalityPy as CharacterPersonalityPy

def create__melanie():
    mel = CharactersBasePy.BaseCharacter(name = "Melanie", gender = CharacterFundamentsPy.Gender.FEMALE, age = 20)
    mel.personality = CharacterPersonalityPy.Personality
    mel.personality.cynicism = CharacterFundamentsPy.TraitIntensity.GOOD.value
    mel.personality.sociability = CharacterFundamentsPy.TraitIntensity.GREAT.value
    mel.personality.confidence = CharacterFundamentsPy.TraitIntensity.GREAT.value
    mel.personality.courage = CharacterFundamentsPy.TraitIntensity.GOOD.value
    mel.personality.inhibitions = CharacterFundamentsPy.TraitIntensity.MODEST.value
    # TODO: Add inhibitions here.
    mel.personality.pride = CharacterFundamentsPy.TraitIntensity.GREAT.value
    mel.personality.morality = CharacterFundamentsPy.TraitIntensity.POOR.value
    mel.personality.empathy = CharacterFundamentsPy.TraitIntensity.POOR.value
    mel.personality.beliefs = CharacterFundamentsPy.TraitIntensity.GOOD.value
    # TODO: mel.personality.tasteStyle = 

