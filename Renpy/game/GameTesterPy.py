import tkinter as tk
import tkinter.scrolledtext as tkScrolledText
import tkinter.font as tkFont
import PowerPlayFramework.CharacterSystems.CharacterNamesPy as names
import PowerPlayFramework.CharacterSystems.CharactersBasePy as charbase
import PowerPlayFramework.CharacterSystems.CharacterFundamentsPy as fundaments
import PowerPlayFramework.CharacterInteractions.Relationships.RelationshipsPy as relationships

class PlayerOption:
    def __init__(self, text, command):
        self.text = text
        self.command = command

class OptionButton(tk.Button):
    def __init__(self, master, text, command):
        super().__init__(master = master, relief = tk.FLAT, text = text, command = command)
        if (len(text) < 10):
            super().configure(width = 10)
        self.bind("<Enter>", self.on_enter_change_hover_color)
        self.bind("<Leave>", self.on_leave_reset_hover_color)
        self.pack(fill = tk.X)

    def on_enter_change_hover_color(self, event):
        event.widget.config(bg = "orange")

    def on_leave_reset_hover_color(self, event):
        event.widget.config(bg = "systemButtonFace")

class OptionListbox(tk.Listbox):
    def __init__(self, master, *items):
        super().__init__(master = master, relief = tk.FLAT, bg="systemButtonFace")
        #self.listBox.insert(tk.END, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0")
        #self.listBox.insert(tk.END, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12")
        self.bind("<<ListboxSelect>>", self.actionSelected)
        self.bind("<Enter>", self.on_enter_change_hover_color)
        self.bind("<Leave>", self.on_leave_reset_hover_color)

    def resetElements(self, *items):
        self.insert(tk.END, *items)
        if self.size() > 10:
            self.actionsScroll = tk.Scrollbar(master = self.master)
            self.actionsScroll.config( command = self.yview )
            self.actionsScroll.pack(side = tk.RIGHT, fill = tk.Y)
            self.config(yscrollcommand=self.actionsScroll.set)
        else:
            if (hasattr(self, "actionsScroll")):
                self.actionsScroll.destroy()
                del (self.actionsScroll)

    def actionSelected(self, event):
        print("----> ", self.curselection()[0])

    def on_enter_change_hover_color(self, event):
        index = self.index("@%s,%s" % (event.x, event.y))
        self.itemconfig(index, bg="orange")

    def on_leave_reset_hover_color(self, event):
        index = self.index("@%s,%s" % (event.x, event.y))
        self.itemconfig(index, bg="systemButtonFace")

class InteractionsTester:
    def __init__(self):
        self.interactionsTesterWindow = tk.Tk()
        self.interactionsTesterWindow.title("Exerciser")
        self.interactionsTesterWindow.rowconfigure(0, minsize = 720-144, weight = 4)
        self.interactionsTesterWindow.rowconfigure(1, minsize = 144, weight = 1)
        self.interactionsTesterWindow.columnconfigure(0, minsize = 256, weight = 1)

        historyFrame = tk.Frame(master = self.interactionsTesterWindow, background = "#FFFFCC")
        historyFrame.grid(row = 0, column = 0, sticky = "nsew")
        statsFrame = tk.Frame(master = self.interactionsTesterWindow, background = "#FFFF88", width = 200, height = 50)
        statsFrame.grid(row = 1, column = 0, sticky = "nsew")
        self.historyText = tkScrolledText.ScrolledText(master = historyFrame, height = 40, width = 50, wrap = "word")
        self.historyTextFont = tkFont.Font(font = self.historyText["font"])
        self.historyTextFont.configure(size = 8)
        self.historyText.configure(font = self.historyTextFont)
        self.historyText.pack(fill = tk.BOTH)
        exampleLabel = tk.Label(master = statsFrame, text = "abc", bg = "yellow")
        exampleLabel.pack(fill = tk.BOTH)


        rightFrame = tk.Frame(master = self.interactionsTesterWindow, borderwidth = 5)
        rightFrame.grid(row = 0, column = 1, rowspan = 2, sticky = "nsew")
        rightFrame.rowconfigure(0, weight = 100)
        rightFrame.rowconfigure(1, weight = 1)

        canvas = tk.Button(master = rightFrame, text = "This should be an image", bg = "black", fg = "white")
        canvas.grid(row = 0, column = 0, sticky = "nsew")

        lastTextAndActionsFrame = tk.Frame(master = rightFrame)
        lastTextAndActionsFrame.grid(row = 1, column = 0, sticky = "nsew")
        self.textBox = tkScrolledText.ScrolledText(master = lastTextAndActionsFrame, height = 10, padx = 6, bg = "systemButtonFace", relief = tk.FLAT)
        self.textBox.grid(row = 0, column = 0, sticky = "nsew")

        self.actionsFrame = tk.Frame(master = lastTextAndActionsFrame)
        self.actionsFrame.grid(row = 0, column = 1, sticky = "nsew")

        # self.optionsList = OptionListbox(master = self.actionsFrame)
        # self.optionsList.resetElements("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "11", "12")
        # self.optionsList.pack()

        self.optionsButtonList = []
    
    def startTester(self):
        self.interactionsTesterWindow.mainloop()
    
    def resetTextBox(self):
        self.textBox.config(state = tk.NORMAL)
        self.textBox.delete("0.0", tk.END)
        self.textBox.config(state = tk.DISABLED)

    def setTextBox(self, text):
        self.textBox.config(state = tk.NORMAL)
        self.textBox.delete("0.0", tk.END)
        self.textBox.insert("0.0", text)
        self.textBox.config(state = tk.DISABLED)
    
    def newText(self, text):
        previousText = self.textBox.get("0.0", tk.END)
        self.updateHistory(previousText)
        self.setTextBox(text)
    
    def updateHistory(self, text):
        self.historyText.config(state = tk.NORMAL)
        if (text[-1] != "\n"):
            text += "\n"
        self.historyText.insert(tk.END, text)
        self.historyText.config(state = tk.DISABLED)

    def appendToTextBox(self, text):
        self.textBox.config(state = tk.NORMAL)
        self.textBox.insert(tk.END, text)
        self.textBox.config(state = tk.DISABLED)

    def resetOptions(self):
        for optionButton in self.optionsButtonList:
            optionButton.destroy()
        self.optionsButtonList.clear()

    def setOptions(self, optionsList):
        self.resetOptions()
        for option in optionsList:
            optionButton = OptionButton(self.actionsFrame, option.text, option.command)
            self.optionsButtonList.append(optionButton)

    def updateState():
        pass

    def addOption():
        pass

def initializeSystem():
    names.initializeNames()

def startState():
    initializeSystem()

    tester = InteractionsTester()
    gameLoop = GameLooper(tester)

    tester.startTester()

class GameLooper:
    def __init__(self, interactionsTester):
        self.state = 0
        self.interactionsTester = interactionsTester
        self.interactionsTester.setTextBox("You find youself in the void...\nDecide who to be.\n")
        self.interactionsTester.appendToTextBox("\t- Select a gender.\n")
        options = []
        options.append(PlayerOption("Male", self.progressStateMale))
        options.append(PlayerOption("Female", self.progressStateFemale))
        self.interactionsTester.setOptions(options)

        self.NPCs = []
    
    def progressStateFemale(self):
        self.interactionsTester.newText("You will be a female for this test.\n")
        self.progressStateSetGender(fundaments.Gender.FEMALE)

    def progressStateMale(self):
        self.interactionsTester.newText("You will be a male for this test.\n")
        self.progressStateSetGender(fundaments.Gender.MALE)

    def progressStateSetGender(self, gender):
        self.protagonistGender = gender
        self.interactionsTester.appendToTextBox("\t- Now, select your age.\n")
        options = []
        options.append(PlayerOption("18", self.progressStateSetAge18))
        options.append(PlayerOption("20", self.progressStateSetAge20))
        options.append(PlayerOption("21", self.progressStateSetAge21))
        options.append(PlayerOption("25", self.progressStateSetAge25))
        options.append(PlayerOption("35", self.progressStateSetAge35))
        options.append(PlayerOption("42", self.progressStateSetAge42))
        self.interactionsTester.setOptions(options)

    def progressStateSetAge18(self):
        self.progressStateSetAge(18)
    def progressStateSetAge20(self):
        self.progressStateSetAge(20)
    def progressStateSetAge21(self):
        self.progressStateSetAge(21)
    def progressStateSetAge25(self):
        self.progressStateSetAge(25)
    def progressStateSetAge35(self):
        self.progressStateSetAge(35)
    def progressStateSetAge42(self):
        self.progressStateSetAge(42)
    def progressStateSetAge(self, age):
        self.protagonistAge = age
        self.interactionsTester.newText("You will be " + str(age) + " for this test.\n")
        self.protagonist = charbase.BaseCharacter(name = "Protagonist", gender = self.protagonistGender, age = self.protagonistAge)
        options = []
        options.append(PlayerOption("Continue", self.progressStateSetRandomInteractor))
        self.interactionsTester.setOptions(options)

    def progressStateSetRandomInteractor(self):
        npc = charbase.BaseCharacter.generateRandom(gender = fundaments.Gender.FEMALE)
        self.NPCs.append(npc)
        npc.relationships[self.protagonist] = relationships.CharacterRelationships(self.protagonist)
        self.protagonist.relationships[npc] = relationships.CharacterRelationships(npc)
        self.interactionsTester.newText("You will be interacting with " + npc.name  + " " + npc.names.last + ", " + str(npc.age) + " years old, for this test.")
        options = []
        options.append(PlayerOption("Continue", self.progressStatePrepareForSetLocation))
        self.interactionsTester.setOptions(options)

    def progressStatePrepareForSetLocation(self):
        self.interactionsTester.newText("Now, decide *where* you want to be.\n")
        options = []
        options.append(PlayerOption("Continue", self.progressStateSetRandomInteractor))
        options.append(PlayerOption("School", self.progressStateSetLocationSchool))
        options.append(PlayerOption("Residences", self.progressStateSetLocationResidences))
        options.append(PlayerOption("Night Club", self.progressStateSetLocationNightClub))
        options.append(PlayerOption("Bar", self.progressStateSetLocationBar))
        options.append(PlayerOption("Hotel", self.progressStateSetLocationHotel))
        options.append(PlayerOption("Clothes Store", self.progressStateSetLocationClothesStore))
        options.append(PlayerOption("Beach", self.progressStateSetLocationBeach))
        options.append(PlayerOption("Market", self.progressStateSetLocationMarket))
        options.append(PlayerOption("Police Station", self.progressStateSetLocationPoliceStation))
        self.interactionsTester.setOptions(options)
    

    def progressStateSetLocationSchool(self):
        self.location = "LocationSchool"
        self.progressStateSetLocation()
    def progressStateSetLocationResidences(self):
        self.location = "LocationResidences"
        self.progressStateSetLocation()
    def progressStateSetLocationNightClub(self):
        self.location = "LocationNightClub"
        self.progressStateSetLocation()
    def progressStateSetLocationBar(self):
        self.location = "LocationBar"
        self.progressStateSetLocation()
    def progressStateSetLocationHotel(self):
        self.location = "LocationHotel"
        self.progressStateSetLocation()
    def progressStateSetLocationClothesStore(self):
        self.location = "LocationClothesStore"
        self.progressStateSetLocation()
    def progressStateSetLocationBeach(self):
        self.location = "LocationBeach"
        self.progressStateSetLocation()
    def progressStateSetLocationMarket(self):
        self.location = "LocationMarket"
        self.progressStateSetLocation()
    def progressStateSetLocationPoliceStation(self):
        self.location = "LocationPoliceStation"
        self.progressStateSetLocation()
    def progressStateSetLocation(self):
        self.interactionsTester.newText("You will be interacting at '" + self.location + "' for this test.")

        options = []
        options.append(PlayerOption("Continue", self.progressStatePrepareForSetLocation))
        self.interactionsTester.setOptions(options)

    def progressStateChoseInteraction(self):
        self.interactionsTester.newText("What kind of interaction do you want to have with " + self.NPCs[0].name + "?")

        options = []
        options.append(PlayerOption("Friendly interaction.", self.progressStatePrepareForSetInteractionToFriendly))
        options.append(PlayerOption("Power interaction.", self.progressStatePrepareForSetInteractionToPower))
        options.append(PlayerOption("Sensual interaction.", self.progressStatePrepareForSetInteractionToSensual))
        self.interactionsTester.setOptions(options)

    def progressStatePrepareForSetInteractionToFriendly(self):
        npc = self.NPCs[0]
        self.interactionsTester.newText("Your friendliness with " + npc.name + " is at level " + self.relationships[npc] + ".")
        pass

    def progressStatePrepareForSetInteractionToPower(self):
        pass

    def progressStatePrepareForSetInteractionToSensual(self):
        pass

    # TODO: Implement this.    
    # def progressStateSetSchoolRelationship(self):
    #     if (self.location == "LocationSchool"):
    #         # You can be a student.
    #         # You can be a teacher
    #         # You can be the principal
    #         # The NPC can be a student
    #         # The NPC can be a teacher
    #         # The NPC can be the principal
    #         pass

startState()
