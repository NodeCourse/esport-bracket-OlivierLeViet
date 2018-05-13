# esport-bracket

Create an application with sign in/up that lets users create e-sport tournaments.
The idea is to create a bracket with several teams competing, a bit like this:

![](https://cdn.vox-cdn.com/thumbor/2t1xbdOLVrpPU3CUxR4Run3tDbI=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/57291735/semifinals.0.png)

The user journey should look like this:

Jane visits the site, she creates a new account.
She's now logged in and can access her profile where she finds a "create tournament" button.
She creates a tournament by giving it a name and entering the list of teams participating.
Once the tournament is created, she is redirected to a page where she can see the bracket.
She can edit a match to declare a winner, that winner should appear in the next match.
She can also share the URL of a tournament for others to see.

## Step by step

This exercise is much more complicated than the previous ones.
It wraps up everything seen so far so take some time to plan the application ahead.
More importantly, take some time to think about the database structure.
How should tournaments be represented?
Once you're ready, jump in:

1. Get a copy of this repository
2. Clone it on your computer
3. Create a new branch for your work
4. Setup Express and start by rendering a simple home page
5. Setup Sequelize and start by creating user accounts through a sign up form
6. Setup Passport, create an user session on sign up
7. Now that everything is set up, you should be able to develop the rest of the application
8. Commit and push your changes
9. Visit your GitHub repository to create a pull request
