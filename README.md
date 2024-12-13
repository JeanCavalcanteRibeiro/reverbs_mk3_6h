# reverbs_mk3_6h
 
Reverbs Angular + express with typescript coding exercise.

Code done within 6 hours (4 thu + 2 fri). This is V3 (third try) at the challenge. Including the previous two repos (live coding one + cold retry after) the total hours spent on this should approach ~9.5. Time reading documentation not included.

For this project, I followed a simple approach: experiment as much as possible with Angular. After a considerable hiccup on the live coding interview, I restarted the project from zero; and this is what followed after that: most of my errors are intact, but the project works.

I did not add any kind of testing, validation, or even database connections; back-end is fully simulated through routes. My approach to routing isn't good either, as I cut a lot of corners to focus on the part that I had less experience with (React). By a lot I mean a LOT. The single (yikes) file for the back-end was finished within 30 minutes (as I was experimenting with Gemini to see the most common methods it gave me).

The front-end is structured with Angular CLI. All component (folders) are created via CLI. Do note that the "components" are not really components at all, as they were more me messing around with Angular to see how it worked in practice. For example, I use the same input in different places but it is not a proper component (its just a copy-pasted-ish component; see components/gemini-key-input and components/list-input).

Components were named based on their main module (todo-list), followed by their function. Which on second thought wasn't really needed as the CLI appears to handle that quite well.

Full disclosure:
	Most of the HTML/CSS and Tailwind classes are AI-Generated with Gemini 1.5 pro 0612.
	"In-html" javascript code is mostly mine, as Gemini kept missing some key spots. Interestingly enough, Gemini 2.0 flash appears to handle single files better for now (not the entire project).
	Hacky CSS is 100% on me. Since I am supposed to be "full stack", and there is barely any semblance of design anywhere (whoops, Angular cooked me), I decided to take some styling inspiration from a certain website.
	90% of the syntax was given to me by Gemini, and double-checked through Angular docs and Google. Grounding was disabled on my model.

What I "abstracted" away:
	Models.   	I have only one model that gets hacked around.
	Services. 	Gemini API should be handled by a service (and it should be an environmental SECRET).
	Database. 	As I have exceeded my internal limit for how much I should push projects, I decided to not implement any kind of database.
			  	For context, I usually use SQLite for projects like these.
	Logs.	  	I have not added a single logger anywhere. I would honestly say that this is probably my biggest sin here, as logs are very very important.
	Tests.		I am not confident enough to do a full test routine on Angular for now.
	Configs. 	Pretty much all configuration files are in the same state as they were initiated at. Very bad. I don't even have a .gitignore, as I had to convert to a Github project.
				For context, I usually follow conventional commits with byte-sized commits and quite a lot of squashing for pull requests.

On Design:
				I would usually never do anything close to this. My main focus during web design is acessibility and responsiveness, in that order. There is no way any of this comes even close to
				WCAG guidelines. Tabs don't even work. Screen readers don't work either. 
				All designs are completely barebones. I would say that if I were to double the amount of time I had, I could probably do something more proper, but I shall not do that as of this moment.
				Note how the buttons aren't even that aligned; with the update boxes and delete butons having almost no styling. This is no good.

On documentation:
				I have left some (unhelpful) comments in places where I had to write a bit more of code. My normal approach is to use JSDoc styled comments for documentation; as well as moreDescritiveFunctionNames
				and very_attention_seeking_variables AND_CONSTANTS. Of which none are present in this project (save for the component names).
On Gemini:		
				The API key is free as of 2024-12-13, with up to 150 requests per minute. I was initially going to turn everything in yesterday, but I wanted to add AI somewhere.
				I was going to use RWKV, but I would probably spend a lot more time on integration than on this project.

Last thoughts:
	I say that React is quite a lot friendlier than Angular, even after all of its redoes. Angular appears to be quite hacky, at least to my inexperienced hands.

All in all, it was a fun experience.
