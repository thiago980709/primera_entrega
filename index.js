const {cursos}=require('./datos.js');
var express = require('express')
var app = express()


const opciones={
    id:{
        demand:true,
        alias: 'i'
    },
    nombre:{
        demand:true,
        alias: 'n'
    },
    cedula:{
        demand:true,
        alias: 'c'
    }
}


const argv = require('yargs')
.command('inscribir','Inscribirse a un curso',opciones)
.argv

if(argv.i <= cursos.length){
    let id_curso = argv.i;
    let est_nombre = argv.n;
    let est_cc = argv.c;
    let estudiante ={est_nombre,est_cc,id_curso}
    let curso = cursos.find(nameCurso => nameCurso.id == id_curso);
    console.log('El curso es: ' + curso.nombre);
    console.log('La duracion es: ' + curso.duracion);
    console.log('El valor  es: ' + curso.valor);

    // const fs = require('fs');

    // let crearArchivo = (estudiante)=>{
    //     texto = 'El estudiante : '+estudiante.est_nombre + "\r\n"+
    //     'con cedula: '+ estudiante.est_cc + "\r\n"+
    //     'Se ha matriculado en el curso: '+curso.nombre + 
    //     'tiene una duracion de: '+ curso.duracion +
    //     'y un valor de: '+ curso.valor;
    //     fs.writeFile('matricula.txt',texto,(err)=>{
    //         if(err)throw(err);
    //         console.log('Se creo el archivo')
    //     });
    // }

    // crearArchivo(estudiante);
    
    texto = 'El estudiante : '+estudiante.est_nombre + "\r\n"+
        'con cedula: '+ estudiante.est_cc + "\r\n"+
        'Se ha matriculado en el curso: '+curso.nombre + 
        ' tiene una duracion de: '+ curso.duracion +
        ' y un valor de: '+ curso.valor;

    app.get('/', function(req,res){
        res.send(texto)
    })
    
    app.listen(3000)

}else{
    console.log('El curso ingresado no es valido, estos son nuestros cursos')
    for (let i = 0; i < cursos.length; i++) {
        setTimeout(()=>{
            let{id,nombre,duracion,valor} = cursos[i];
            console.log('El id del curso es: ' + id);
            console.log('El nombre del curso es: ' + nombre);
            console.log('La duracion del curso es: ' + duracion);
            console.log('El valor del curso es: ' + valor)
    
        },i*2000);   
    }
    console.log('Para inscribirse a uno de los cursos utilice la instrucion: node index inscribir -i=id del curso -n=nombre -c=cedula');
}


