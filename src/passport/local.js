import passport from 'passport';
import { Strategy } from 'passport-local';
import { usuariosDao } from '../persistencia/daos/index.js';
import {UsuariosDaoMongoDb} from '../persistencia/daos/usuarios/UsuariosDaoMongoDb.js';
import bcrypt, { compare } from 'bcrypt';

function encriptar(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

function comparar(password, hashDb){
    return bcrypt.compareSync(password, hashDb);
}

const localStrategy = Strategy;

passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.getByEmail(email);
    if(usuarioDb){
        return done(null, false);
    }

    const nuevoUsuario = new UsuariosDaoMongoDb();
    const obj = {
        email: email,
        password: encriptar(password)
    }
    nuevoUsuario.email = email;
    nuevoUsuario.password = encriptar(password);
    await nuevoUsuario.create(obj);
    done(null, nuevoUsuario);
}))

passport.serializeUser((usuario, done)=>{
    done(null, usuario.email);
})

passport.deserializeUser(async(email, done)=>{
    const usuario = await usuariosDao.getByEmail(email);
    done(null, usuario);
})

function isValidPassword(){

}

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.getByEmail(email);
    console.log(usuarioDb);
    if(!usuarioDb){
        console.log("entra acá")
        return done(null, false);
    }
    if(!comparar(password, usuarioDb.password)){
        console.log("Contraseña incorrecta");
        return done(null, false)
    }

    done(null, usuarioDb);
}))


