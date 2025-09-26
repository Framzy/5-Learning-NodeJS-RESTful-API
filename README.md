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

### Generate Prisma

```
npx prisma generate
```

## Prepare Unit Test

```
Install
    "@babel/preset-env": "^7.28.3",
    "@types/jest": "^30.0.0",
    "babel-jest": "^30.1.2",
    "jest": "^30.1.3",
```

```
Package json
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
```

```
Babel config
{
  "presets": ["@babel/preset-env"]
}

```
