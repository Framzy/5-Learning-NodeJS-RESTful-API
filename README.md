# Learning NodeJS RESTful API

Set up mysql on MacOs

## install mysql

```zsh
brew install mysql
```

### Start mysql (Auto Start Every Restart)

```zsh
brew services start mysql
```

### or (Just One Time)

```zsh
 mysql.server start
```

### Stop mysql (Stop Auto Start)

```zsh
brew services stop mysql
```

### or (Stop One Time)

```zsh
 mysql.server stop
```

## Install Prisma

```zsh
npm install @prisma/client prisma --save-dev
```

### Generate Prisma

```zsh
npx prisma generate
```

## Prepare Unit Test

```json
Install
    "@babel/preset-env": "^7.28.3",
    "@types/jest": "^30.0.0",
    "babel-jest": "^30.1.2",
    "jest": "^30.1.3",
```

```json
Package json
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
```

```json
Babel config
{
  "presets": ["@babel/preset-env"]
}

```
