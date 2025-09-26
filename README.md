# Learning NodeJS RESTful API

Set up mysql on MacOs

## install mysql

```
brew install mysql
```

### Start mysql (Auto Start Every Restart)

```
brew services start mysql
```

### or (Just One Time)

```
 mysql.server start
```

### Stop mysql (Stop Auto Start)

```
brew services stop mysql
```

### or (Stop One Time)

```
 mysql.server stop
```

## Install Prisma

```
npm install @prisma/client prisma --save-dev
```

### Generate prisma

```
npx prisma generate
```

##
